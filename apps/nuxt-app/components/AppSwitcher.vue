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
  <div class="flex flex-col gap-2">
    <span class="font-mono text-xs" style="color: var(--color-faint)">
      built with <span style="color: var(--color-muted)">{{ apps[props.current].stack }}</span>
    </span>
    <div class="flex flex-wrap items-center gap-2">
      <span class="font-mono text-xs" style="color: var(--color-faint)">view in</span>
      <a
        v-for="[key, app] in others"
        :key="key"
        :href="app.url"
        class="font-mono text-xs px-2 py-1 rounded border transition-colors"
        style="border-color: var(--color-border); color: var(--color-muted)"
      >
        {{ app.label }}
      </a>
    </div>
  </div>
</template>
