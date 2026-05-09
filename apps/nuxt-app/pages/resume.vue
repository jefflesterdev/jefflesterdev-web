<script setup lang="ts">
import type { Profile, SkillGroup, Experience, Achievement } from '@jld/types'

const { profile: fetchProfile, skills: fetchSkills, experience: fetchExperience, achievements: fetchAchievements } = useApi()

const profile      = ref<Profile | null>(null)
const skills       = ref<SkillGroup[]>([])
const experience   = ref<Experience[]>([])
const achievements = ref<Achievement[]>([])

onMounted(async () => {
  try {
    const [p, s, e, a] = await Promise.all([
      fetchProfile(), fetchSkills(), fetchExperience(), fetchAchievements(),
    ])
    profile.value      = p
    skills.value       = s
    experience.value   = e
    achievements.value = a
  } catch (err) {
    console.error(err)
  }
})

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtDate(d: string | null): string {
  if (!d) return 'Present'
  const [year, month] = d.split('-')
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`
}

function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

const contact = computed(() => [
  profile.value?.location,
  profile.value?.email,
  profile.value?.github_url   ? cleanUrl(profile.value.github_url)   : null,
  profile.value?.linkedin_url ? cleanUrl(profile.value.linkedin_url) : null,
].filter(Boolean).join('  |  '))

useHead({ title: 'Resume — Jeff Lester' })

onMounted(() => { document.body.classList.add('r-resume-screen') })
onUnmounted(() => { document.body.classList.remove('r-resume-screen') })

function printPage() { window.print() }
</script>

<template>
  <div class="r-screen">
    <button class="r-btn" @click="printPage">↓ Save as PDF</button>

    <div class="r-page">
      <h1 class="r-name">{{ profile?.name ?? 'Jeff Lester' }}</h1>
      <p v-if="profile?.tagline" class="r-tagline">{{ profile.tagline }}</p>
      <p class="r-contact">{{ contact }}</p>
      <hr class="r-rule" />

      <section v-if="skills.length" class="r-section">
        <h2>Technical Skills</h2>
        <div v-for="group in skills" :key="group.id" class="r-skill">
          <strong>{{ group.name }}:</strong>{{ ' ' }}{{ group.skills.map(s => s.name).join(', ') }}
        </div>
      </section>

      <section v-if="achievements.length" class="r-section">
        <h2>Key Achievements</h2>
        <ul class="r-list">
          <li v-for="a in achievements" :key="a.id">{{ a.description }}</li>
        </ul>
      </section>

      <section v-if="experience.length" class="r-section">
        <h2>Professional Experience</h2>
        <div v-for="exp in experience" :key="exp.id" class="r-exp">
          <div class="r-exp-header">
            <div>
              <span class="r-company">{{ exp.company }}</span>
              <span class="r-title">, {{ exp.title }}</span>
            </div>
            <span class="r-dates">{{ fmtDate(exp.start_date) }} – {{ fmtDate(exp.end_date) }}</span>
          </div>
          <ul v-if="exp.items.length" class="r-list">
            <li v-for="item in exp.items" :key="item.id">{{ item.content }}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
@media screen { body.r-resume-screen { background: #d0d0d0 !important; } }

.r-screen {
  min-height: 100vh;
}

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
