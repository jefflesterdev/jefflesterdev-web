import type { Profile, SkillGroup, Experience, Achievement } from '@jld/types'
import { fetchProfile, fetchSkills, fetchExperience, fetchAchievements } from './api'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtDate(d: string | null): string {
  if (!d) return 'Present'
  const [year, month] = d.split('-')
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function render(
  profile: Profile | null,
  skills: SkillGroup[],
  experience: Experience[],
  achievements: Achievement[],
): void {
  const contact = [
    profile?.location,
    profile?.email,
    profile?.github_url   ? cleanUrl(profile.github_url)   : null,
    profile?.linkedin_url ? cleanUrl(profile.linkedin_url) : null,
  ].filter(Boolean).join('  |  ')

  const skillsHtml = skills.length ? `
    <section class="r-section">
      <h2>Technical Skills</h2>
      ${skills.map(g => `
        <div class="r-skill"><strong>${esc(g.name)}:</strong> ${g.skills.map(s => esc(s.name)).join(', ')}</div>
      `).join('')}
    </section>` : ''

  const achievementsHtml = achievements.length ? `
    <section class="r-section">
      <h2>Key Achievements</h2>
      <ul class="r-list">
        ${achievements.map(a => `<li>${esc(a.description ?? '')}</li>`).join('')}
      </ul>
    </section>` : ''

  const experienceHtml = experience.length ? `
    <section class="r-section">
      <h2>Professional Experience</h2>
      ${experience.map(exp => `
        <div class="r-exp">
          <div class="r-exp-header">
            <div>
              <span class="r-company">${esc(exp.company)}</span>
              <span class="r-title">, ${esc(exp.title)}</span>
            </div>
            <span class="r-dates">${esc(fmtDate(exp.start_date))} – ${esc(fmtDate(exp.end_date))}</span>
          </div>
          ${exp.items.length ? `
            <ul class="r-list">
              ${exp.items.map(item => `<li>${esc(item.content)}</li>`).join('')}
            </ul>` : ''}
        </div>`).join('')}
    </section>` : ''

  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <style>
      @media screen { body { background: #d0d0d0 !important; } }
      .r-page {
        background: white; color: #111;
        font-family: Arial, 'Helvetica Neue', sans-serif;
        font-size: 10.5pt; line-height: 1.4;
        max-width: 8.5in; margin: 0 auto; padding: 0.75in 0.85in;
      }
      @media screen {
        .r-page { margin: 1.5rem auto; box-shadow: 0 4px 24px rgba(0,0,0,0.25); min-height: 11in; }
      }
      .r-btn {
        position: fixed; top: 1rem; right: 1rem;
        background: #1d3461; color: white; border: none;
        padding: 0.5rem 1.1rem; font-size: 0.85rem; font-family: Arial, sans-serif;
        cursor: pointer; border-radius: 4px; z-index: 100;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      .r-btn:hover { background: #2a4a8a; }
      .r-name    { font-size: 2rem; font-weight: 700; text-align: center; margin: 0 0 0.1rem; color: #111; }
      .r-tagline { text-align: center; font-size: 0.9rem; color: #444; margin: 0 0 0.15rem; }
      .r-contact { text-align: center; font-size: 0.8rem; color: #555; margin: 0 0 0.5rem; }
      .r-rule    { border: none; border-top: 1.5px solid #1d3461; margin: 0 0 0.55rem; }
      .r-section { margin-bottom: 0.55rem; }
      .r-section h2 {
        font-size: 0.82rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.08em; color: #1d3461;
        border-bottom: 1px solid #1d3461; padding-bottom: 0.12rem; margin: 0 0 0.3rem;
      }
      .r-skill        { font-size: 0.82rem; color: #222; margin-bottom: 0.1rem; }
      .r-skill strong { color: #111; }
      .r-list    { list-style: disc; padding-left: 1.1rem; margin: 0; }
      .r-list li { font-size: 0.82rem; color: #222; margin-bottom: 0.1rem; line-height: 1.35; }
      .r-exp        { margin-bottom: 0.45rem; }
      .r-exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin-bottom: 0.06rem; }
      .r-company    { font-size: 0.88rem; font-weight: 700; color: #1d3461; }
      .r-title      { font-size: 0.85rem; color: #222; }
      .r-dates      { font-size: 0.78rem; font-style: italic; color: #555; white-space: nowrap; flex-shrink: 0; }
      @media print {
        @page { margin: 0.65in 0.75in; }
        .r-btn  { display: none !important; }
        .r-page { padding: 0; max-width: none; box-shadow: none; margin: 0; min-height: 0; }
        body    { background: white !important; }
      }
    </style>
    <button class="r-btn" onclick="window.print()">↓ Save as PDF</button>
    <div class="r-page">
      <h1 class="r-name">${esc(profile?.name ?? 'Jeff Lester')}</h1>
      ${profile?.tagline ? `<p class="r-tagline">${esc(profile.tagline)}</p>` : ''}
      <p class="r-contact">${esc(contact)}</p>
      <hr class="r-rule" />
      ${skillsHtml}
      ${achievementsHtml}
      ${experienceHtml}
    </div>`
}

// Initial render with loading state
render(null, [], [], [])

Promise.all([
  fetchProfile(),
  fetchSkills(),
  fetchExperience(),
  fetchAchievements(),
]).then(([p, s, e, a]) => render(p, s, e, a)).catch(console.error)
