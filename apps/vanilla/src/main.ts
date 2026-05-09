import './style.css'
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { Profile, Experience, SkillGroup, Achievement } from '@jld/types'
import { API_BASE, fetchProfile, fetchSkills, fetchExperience, fetchAchievements } from './api'

const NEXT_URL    = import.meta.env.VITE_NEXT_URL    ?? 'http://localhost:3000'
const NUXT_URL    = import.meta.env.VITE_NUXT_URL    ?? 'http://localhost:3001'

// ── State ─────────────────────────────────────────────────────────
let locale: Locale = 'en'
let profile: Profile | null = null
let experiences: Experience[] = []
let skills: SkillGroup[] = []
let achievements: Achievement[] = []

// ── Helpers ───────────────────────────────────────────────────────
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function dateRange(start: string, end: string | null, present: string): string {
  const fmt = (d: string) => d.slice(0, 7).replace('-', '/')
  return end ? `${fmt(start)} – ${fmt(end)}` : `${fmt(start)} – ${present}`
}

const proficiencyClass: Record<string, string> = {
  expert: 'chip-expert', proficient: 'chip-proficient', familiar: 'chip-familiar',
}

// ── Section builders ──────────────────────────────────────────────
function buildSidebar(t: ReturnType<typeof useTranslations>): string {
  const nextLocale: Locale = locale === 'en' ? 'fr-CA' : 'en'
  const nextLocaleLabel = nextLocale === 'fr-CA' ? 'French (Canada)' : 'English'

  const avatar = profile?.photo_url
    ? `<img src="${esc(profile.photo_url)}" alt="" style="width:100%;height:100%;object-fit:cover" />`
    : `<span aria-hidden="true">JL</span>`

  const available = profile?.available
    ? `<div class="flex items-center gap-2 text-sm" style="color:var(--color-green)">
        <span class="pulse-dot" aria-hidden="true"></span>
        ${esc(t.availability.open)}
       </div>` : ''

  const location = profile?.location
    ? `<p class="text-xs" style="color:var(--color-faint)"><span aria-hidden="true">📍</span> ${esc(profile.location)}</p>` : ''

  const github = profile?.github_url
    ? `<a role="listitem" href="${esc(profile.github_url)}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub profile (opens in new tab)"><span aria-hidden="true">↗</span> github</a>` : ''

  const linkedin = profile?.linkedin_url
    ? `<a role="listitem" href="${esc(profile.linkedin_url)}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn profile (opens in new tab)"><span aria-hidden="true">↗</span> linkedin</a>` : ''

  const email = profile?.email
    ? `<a role="listitem" href="mailto:${esc(profile.email)}" class="social-link" aria-label="Send email to ${esc(profile.email)}"><span aria-hidden="true">↗</span> ${esc(profile.email)}</a>` : ''

  const nav = ['bio', 'experience', 'skills', 'achievements'].map(key =>
    `<li><a href="#${key}" class="nav-link"><span aria-hidden="true" class="font-mono text-xs" style="color:var(--color-accent)">›</span> ${esc(t.nav[key as keyof typeof t.nav])}</a></li>`
  ).join('')

  return `
    <div class="flex flex-col gap-3">
      <div class="w-20 h-20 rounded-full flex items-center justify-center font-mono text-xl font-bold border-2 overflow-hidden"
           style="border-color:var(--color-accent);background:var(--color-raised);color:var(--color-accent)"
           role="img" aria-label="${profile?.name ? esc(profile.name) + ' profile photo' : 'Profile photo placeholder'}">
        ${avatar}
      </div>
      <div>
        <h1 class="font-mono text-2xl font-bold name-glow" style="color:var(--color-accent)">${esc(profile?.name ?? 'Jeff Lester')}</h1>
        ${profile?.tagline ? `<p class="text-sm mt-1" style="color:var(--color-muted)">${esc(profile.tagline)}</p>` : ''}
      </div>
      ${available}
      ${location}
    </div>

    <nav aria-label="Page sections">
      <ul class="flex flex-col gap-0.5 list-none m-0 p-0">${nav}</ul>
    </nav>

    <a href="/resume.html" class="nav-link" style="color:var(--color-accent)">
      <span aria-hidden="true" class="font-mono text-xs" style="color:var(--color-accent)">↓</span>
      resume
    </a>

    <div class="flex flex-col gap-0.5" role="list" aria-label="Social links">
      ${github}${linkedin}${email}
    </div>

    <div class="flex-1"></div>

    <div class="flex flex-col gap-3 pt-4" style="border-top:1px solid var(--color-border)">
      <div class="flex flex-col gap-2">
        <span class="font-mono text-xs" style="color:var(--color-faint)">
          built with <span style="color:var(--color-muted)">Vanilla TypeScript</span>
        </span>
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-mono text-xs" style="color:var(--color-faint)">view in</span>
          <a href="${NEXT_URL}" class="font-mono text-xs px-2 py-1 rounded border transition-colors" style="border-color:var(--color-border);color:var(--color-muted)">Next.js</a>
          <a href="${NUXT_URL}" class="font-mono text-xs px-2 py-1 rounded border transition-colors" style="border-color:var(--color-border);color:var(--color-muted)">Nuxt</a>
        </div>
      </div>
      <a href="${API_BASE}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="API documentation (opens in new tab)">
        <span aria-hidden="true">↗</span> api docs
      </a>
      <button id="lang-toggle"
        class="self-start font-mono text-xs px-3 py-2 rounded border transition-colors min-h-11"
        style="border-color:var(--color-accent);color:var(--color-accent)"
        aria-label="Switch language to ${nextLocaleLabel}">
        ${esc(t.language.toggle)}
      </button>
      <p class="font-mono text-xs" style="color:var(--color-faint)">© ${new Date().getFullYear()} Jeff Lester</p>
    </div>`
}

function buildBio(t: ReturnType<typeof useTranslations>): string {
  if (!profile?.bio) return ''
  const paragraphs = profile.bio.split('\n\n').filter(Boolean)
  return `
    <section id="bio" class="mb-16" aria-labelledby="bio-heading">
      <div class="flex items-center gap-3 mb-8">
        <span aria-hidden="true" class="font-mono text-sm select-none" style="color:var(--color-accent)">//</span>
        <h2 class="font-mono text-xs font-medium tracking-widest uppercase whitespace-nowrap" style="color:var(--color-muted)">${esc(t.nav.bio)}</h2>
        <div aria-hidden="true" class="flex-1 h-px" style="background:var(--color-border)"></div>
      </div>
      <div class="flex flex-col gap-4">
        ${paragraphs.map(p => `<p class="text-sm leading-relaxed" style="color:var(--color-muted)">${esc(p)}</p>`).join('')}
      </div>
    </section>`
}

function buildExperience(t: ReturnType<typeof useTranslations>): string {
  if (!experiences.length) return ''
  const items = experiences.map(exp => {
    const badge = exp.employment_type
      ? `<span class="ml-2 px-1.5 py-0.5 rounded text-xs" style="background:var(--color-raised);color:var(--color-muted)">${esc(exp.employment_type)}</span>` : ''
    const summary = exp.summary
      ? `<p class="text-sm mb-3 leading-relaxed" style="color:var(--color-muted)">${esc(exp.summary)}</p>` : ''
    const location = exp.location ? ` · ${esc(exp.location)}` : ''
    const bullets = exp.items.map(item => {
      const star = item.type === 'achievement'
        ? `<span aria-hidden="true" class="font-mono mt-0.5 flex-shrink-0 text-xs" style="color:var(--color-yellow)">★</span><span class="sr-only">Achievement: </span>`
        : `<span aria-hidden="true" class="font-mono mt-0.5 flex-shrink-0 text-xs" style="color:var(--color-faint)">·</span>`
      return `<li class="flex gap-2.5 text-sm" style="color:var(--color-muted)">${star}${esc(item.content)}</li>`
    }).join('')

    return `
      <article class="relative">
        <div aria-hidden="true" class="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2"
             style="border-color:var(--color-accent);background:var(--color-bg)"></div>
        <p class="font-mono text-xs mb-1" style="color:var(--color-faint)">
          <time>${esc(exp.start_date)}</time>
          <span aria-hidden="true"> – </span><span class="sr-only"> to </span>
          <time>${esc(exp.end_date ?? t.experience.present)}</time>
          ${badge}
        </p>
        <h3 class="text-base font-semibold" style="color:var(--color-text)">${esc(exp.title)}</h3>
        <p class="text-sm mb-2" style="color:var(--color-accent)">${esc(exp.company)}${location}</p>
        ${summary}
        ${bullets ? `<ul class="flex flex-col gap-1.5" aria-label="Responsibilities and achievements">${bullets}</ul>` : ''}
      </article>`
  }).join('')

  return `
    <section id="experience" class="mb-16" aria-labelledby="experience-heading">
      <div class="flex items-center gap-3 mb-8">
        <span aria-hidden="true" class="font-mono text-sm select-none" style="color:var(--color-accent)">//</span>
        <h2 class="font-mono text-xs font-medium tracking-widest uppercase whitespace-nowrap" style="color:var(--color-muted)">${esc(t.nav.experience)}</h2>
        <div aria-hidden="true" class="flex-1 h-px" style="background:var(--color-border)"></div>
      </div>
      <div class="relative flex flex-col gap-10 pl-6">
        <div aria-hidden="true" class="timeline-line"></div>
        ${items}
      </div>
    </section>`
}

function buildSkills(t: ReturnType<typeof useTranslations>): string {
  if (!skills.length) return ''
  const groups = skills.map(group => {
    const chips = group.skills.map(skill => {
      const cls = proficiencyClass[skill.proficiency ?? ''] ?? 'chip-familiar'
      const title = skill.proficiency ? ` title="${skill.proficiency} proficiency"` : ''
      const sr = skill.proficiency ? `<span class="sr-only"> (${esc(skill.proficiency)})</span>` : ''
      return `<li><span class="${cls}"${title}>${esc(skill.name)}${sr}</span></li>`
    }).join('')
    return `
      <div>
        <p id="skill-group-${group.id}" class="font-mono text-xs uppercase tracking-widest mb-3" style="color:var(--color-faint)">${esc(group.name)}</p>
        <ul class="flex flex-wrap gap-2 list-none m-0 p-0" aria-labelledby="skill-group-${group.id}">${chips}</ul>
      </div>`
  }).join('')

  return `
    <section id="skills" class="mb-16" aria-labelledby="skills-heading">
      <div class="flex items-center gap-3 mb-8">
        <span aria-hidden="true" class="font-mono text-sm select-none" style="color:var(--color-accent)">//</span>
        <h2 class="font-mono text-xs font-medium tracking-widest uppercase whitespace-nowrap" style="color:var(--color-muted)">${esc(t.nav.skills)}</h2>
        <div aria-hidden="true" class="flex-1 h-px" style="background:var(--color-border)"></div>
      </div>
      <div class="flex flex-col gap-8">${groups}</div>
    </section>`
}

function buildAchievements(t: ReturnType<typeof useTranslations>): string {
  if (!achievements.length) return ''
  const cards = achievements.map(item => {
    const desc = item.description
      ? `<p class="text-xs leading-relaxed" style="color:var(--color-muted)">${esc(item.description)}</p>` : ''
    return `
      <li class="flex flex-col gap-2 p-4 rounded-lg border transition-colors"
          style="background:var(--color-surface);border-color:var(--color-border)">
        <div class="flex items-start justify-between gap-3">
          <span aria-hidden="true" class="font-mono text-lg leading-none" style="color:var(--color-yellow)">★</span>
          <span class="font-mono text-xs shrink-0" style="color:var(--color-faint)">
            <span class="sr-only">Date range: </span>
            ${esc(dateRange(item.start_date, item.end_date, t.experience.present))}
          </span>
        </div>
        <h3 class="text-sm font-semibold leading-snug" style="color:var(--color-text)">${esc(item.title)}</h3>
        <p class="text-xs font-mono" style="color:var(--color-accent)">${esc(item.company)}</p>
        ${desc}
      </li>`
  }).join('')

  return `
    <section id="achievements" class="mb-16" aria-labelledby="achievements-heading">
      <div class="flex items-center gap-3 mb-8">
        <span aria-hidden="true" class="font-mono text-sm select-none" style="color:var(--color-accent)">//</span>
        <h2 class="font-mono text-xs font-medium tracking-widest uppercase whitespace-nowrap" style="color:var(--color-muted)">${esc(t.nav.achievements)}</h2>
        <div aria-hidden="true" class="flex-1 h-px" style="background:var(--color-border)"></div>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2 list-none m-0 p-0">${cards}</ul>
    </section>`
}

// ── DOM update helpers ────────────────────────────────────────────
function updateSidebar() {
  const el = document.getElementById('sidebar-inner')
  if (el) { el.innerHTML = buildSidebar(useTranslations(locale)); attachListeners() }
}

function updateSections() {
  const t = useTranslations(locale)
  const bio  = document.getElementById('bio-root')
  const exp  = document.getElementById('experience-root')
  const sk   = document.getElementById('skills-root')
  const ach  = document.getElementById('achievements-root')
  if (bio)  bio.innerHTML  = buildBio(t)
  if (exp)  exp.innerHTML  = buildExperience(t)
  if (sk)   sk.innerHTML   = buildSkills(t)
  if (ach)  ach.innerHTML  = buildAchievements(t)
}

function attachListeners() {
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    locale = locale === 'en' ? 'fr-CA' : 'en'
    document.documentElement.lang = locale
    updateSidebar()
    updateSections()
  })
}

// ── Mount ─────────────────────────────────────────────────────────
function mount() {
  const app = document.querySelector<HTMLDivElement>('#app')!

  app.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div class="resume-layout lg:grid lg:grid-cols-[20rem_1fr] min-h-screen">
      <aside
        aria-label="Profile and navigation"
        class="animate-sidebar dot-grid flex flex-col gap-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto"
        style="background:var(--color-surface);border-color:var(--color-border)"
      >
        <div id="sidebar-inner" class="contents">${buildSidebar(useTranslations(locale))}</div>
      </aside>
      <main id="main-content" class="animate-main p-6 sm:p-8 lg:p-12 max-w-3xl" tabindex="-1">
        <div id="bio-root"></div>
        <div id="experience-root"></div>
        <div id="skills-root"></div>
        <div id="achievements-root"></div>
      </main>
    </div>`

  attachListeners()

  Promise.all([
    fetchProfile().then(p => { profile = p; updateSidebar(); updateSections() }),
    fetchExperience().then(e => { experiences = e; const el = document.getElementById('experience-root'); if (el) el.innerHTML = buildExperience(useTranslations(locale)) }),
    fetchSkills().then(s => { skills = s; const el = document.getElementById('skills-root'); if (el) el.innerHTML = buildSkills(useTranslations(locale)) }),
    fetchAchievements().then(a => { achievements = a; const el = document.getElementById('achievements-root'); if (el) el.innerHTML = buildAchievements(useTranslations(locale)) }),
  ]).catch(console.error)
}

mount()
