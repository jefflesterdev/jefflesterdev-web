<script setup lang="ts">
import type { Profile } from '@jld/types'
import type { Locale } from '@jld/i18n'

const locale = ref<Locale>('en')
const profile = ref<Profile | null>(null)
const { profile: fetchProfile } = useApi()

onMounted(async () => {
  try {
    profile.value = await fetchProfile()
  } catch (e) {
    console.error(e)
  }
})

watch(locale, (l) => {
  document.documentElement.lang = l
})

function handleLocaleChange(l: Locale) {
  locale.value = l
}
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="lg:grid lg:grid-cols-[20rem_1fr] min-h-screen">
    <TheSidebar :profile="profile" :locale="locale" @locale-change="handleLocaleChange" />

    <main id="main-content" class="animate-main p-6 sm:p-8 lg:p-12 max-w-3xl" :tabindex="-1">
      <BioSection v-if="profile?.bio" :bio="profile.bio" :locale="locale" />
      <ExperienceSection :locale="locale" />
      <SkillsSection :locale="locale" />
      <AchievementsSection :locale="locale" />
    </main>
  </div>
</template>
