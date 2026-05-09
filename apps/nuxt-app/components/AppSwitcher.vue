<script setup lang="ts">
type App = 'next' | 'nuxt' | 'vanilla'

const props = defineProps<{ current: App }>()
const config = useRuntimeConfig()

const apps: Record<App, { label: string; stack: string; url: string }> = {
  next:    { label: 'Next.js',    stack: 'React / Next.js',    url: (config.public.nextUrl as string)    || 'http://localhost:3000' },
  nuxt:    { label: 'Nuxt',       stack: 'Vue / Nuxt',         url: '/' },
  vanilla: { label: 'Vanilla TS', stack: 'Vanilla TypeScript', url: (config.public.vanillaUrl as string) || 'http://localhost:3002' },
}

const others = computed(() =>
  (Object.entries(apps) as [App, { label: string; stack: string; url: string }][]).filter(
    ([key]) => key !== props.current
  )
)
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <span class="text-gray-500">built with <span class="text-gray-300">{{ apps[props.current].stack }}</span></span>
    <div class="flex items-center gap-3">
      <span class="text-gray-500">View in</span>
      <a
        v-for="[key, app] in others"
        :key="key"
        :href="app.url"
        class="px-3 py-1 rounded border border-gray-300 hover:border-gray-500 transition-colors"
      >
        {{ app.label }}
      </a>
    </div>
  </div>
</template>
