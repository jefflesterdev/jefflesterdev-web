<script setup lang="ts">
import type { Profile } from '@jld/types'
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'

const props = defineProps<{
  profile: Profile | null
  locale: Locale
}>()

const emit = defineEmits<{ localeChange: [locale: Locale] }>()

const { base: apiBase } = useApi()

const t = computed(() => useTranslations(props.locale))
const nextLocale = computed<Locale>(() => props.locale === 'en' ? 'fr-CA' : 'en')
const nextLocaleLabel = computed(() => nextLocale.value === 'fr-CA' ? 'French (Canada)' : 'English')

const NAV = [
  { href: '#bio',          key: 'bio'          as const },
  { href: '#experience',   key: 'experience'   as const },
  { href: '#skills',       key: 'skills'       as const },
  { href: '#achievements', key: 'achievements' as const },
]
</script>

<template>
  <aside
    aria-label="Profile and navigation"
    class="animate-sidebar dot-grid flex flex-col gap-8 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto"
    style="background: var(--color-surface); border-color: var(--color-border)"
  >
    <!-- Avatar + identity -->
    <div class="flex flex-col gap-3">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center font-mono text-xl font-bold border-2 overflow-hidden"
        style="border-color: var(--color-accent); background: var(--color-raised); color: var(--color-accent)"
        role="img"
        :aria-label="profile?.name ? `${profile.name} profile photo` : 'Profile photo placeholder'"
      >
        <img v-if="profile?.photo_url" :src="profile.photo_url" alt="" />
        <span v-else aria-hidden="true">JL</span>
      </div>

      <div>
        <h1 class="font-mono text-2xl font-bold name-glow" style="color: var(--color-accent)">
          {{ profile?.name ?? 'Jeff Lester' }}
        </h1>
        <p v-if="profile?.tagline" class="text-sm mt-1" style="color: var(--color-muted)">
          {{ profile.tagline }}
        </p>
      </div>

      <div v-if="profile?.available" class="flex items-center gap-2 text-sm" style="color: var(--color-green)">
        <span class="pulse-dot" aria-hidden="true" />
        {{ t.availability.open }}
      </div>

      <p v-if="profile?.location" class="text-xs" style="color: var(--color-faint)">
        <span aria-hidden="true">📍</span> {{ profile.location }}
      </p>
    </div>

    <!-- Nav -->
    <nav aria-label="Page sections">
      <ul class="flex flex-col gap-0.5 list-none m-0 p-0">
        <li v-for="item in NAV" :key="item.href">
          <a :href="item.href" class="nav-link">
            <span aria-hidden="true" class="font-mono text-xs" style="color: var(--color-accent)">›</span>
            {{ t.nav[item.key] }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Resume link -->
    <a href="/resume" class="nav-link" style="color: var(--color-accent)">
      <span aria-hidden="true" class="font-mono text-xs" style="color: var(--color-accent)">↓</span>
      resume
    </a>

    <!-- Socials -->
    <div class="flex flex-col gap-0.5" role="list" aria-label="Social links">
      <a
        v-if="profile?.github_url"
        role="listitem"
        :href="profile.github_url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        aria-label="GitHub profile (opens in new tab)"
      >
        <span aria-hidden="true">↗</span> github
      </a>
      <a
        v-if="profile?.linkedin_url"
        role="listitem"
        :href="profile.linkedin_url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        aria-label="LinkedIn profile (opens in new tab)"
      >
        <span aria-hidden="true">↗</span> linkedin
      </a>
      <a
        v-if="profile?.email"
        role="listitem"
        :href="`mailto:${profile.email}`"
        class="social-link"
        :aria-label="`Send email to ${profile.email}`"
      >
        <span aria-hidden="true">↗</span> {{ profile.email }}
      </a>
    </div>

    <div class="flex-1" />

    <!-- Footer -->
    <div class="flex flex-col gap-3 pt-4" style="border-top: 1px solid var(--color-border)">
      <AppSwitcher current="nuxt" />
      <a
        :href="apiBase"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        aria-label="API documentation (opens in new tab)"
      >
        <span aria-hidden="true">↗</span> api docs
      </a>
      <button
        class="self-start font-mono text-xs px-3 py-2 rounded border transition-colors min-h-11"
        style="border-color: var(--color-accent); color: var(--color-accent)"
        :aria-label="`Switch language to ${nextLocaleLabel}`"
        @click="emit('localeChange', nextLocale)"
      >
        {{ t.language.toggle }}
      </button>
      <p class="font-mono text-xs" style="color: var(--color-faint)">
        © {{ new Date().getFullYear() }} Jeff Lester
      </p>
    </div>
  </aside>
</template>
