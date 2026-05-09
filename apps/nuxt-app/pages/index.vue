<script setup lang="ts">
import { type Locale, useTranslations } from '@jld/i18n'

useHead({ title: 'Jeff Lester — Nuxt' })

const locale = ref<Locale>('en')
const t = computed(() => useTranslations(locale.value))

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'fr-CA' : 'en'
}
</script>

<template>
  <main class="min-h-screen p-8">
    <header class="flex items-center justify-between mb-12">
      <h1 class="text-2xl font-bold">Jeff Lester</h1>
      <div class="flex items-center">
        <AppSwitcher current="nuxt" />
        <button
          class="ml-4 px-3 py-1 rounded border border-blue-400 text-blue-600 hover:bg-blue-50 transition-colors text-sm"
          @click="toggleLocale"
        >
          {{ t.language.toggle }}
        </button>
      </div>
    </header>
    <p class="text-gray-500">{{ t.common.comingSoon }} — built with Nuxt 3</p>
    <footer class="mt-12 text-xs text-gray-400 font-mono">
      © {{ new Date().getFullYear() }} Jeff Lester
    </footer>
  </main>
</template>
