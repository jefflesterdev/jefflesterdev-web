<script setup lang="ts">
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { Achievement } from '@jld/types'

const props = defineProps<{ locale: Locale }>()
const t = computed(() => useTranslations(props.locale))

const items = ref<Achievement[]>([])
const { achievements } = useApi()

function dateRange(start: string, end: string | null, present: string): string {
  const fmt = (d: string) => d.slice(0, 7).replace('-', '/')
  return end ? `${fmt(start)} – ${fmt(end)}` : `${fmt(start)} – ${present}`
}

onMounted(() => {
  achievements().then(data => { items.value = data }).catch(console.error)
})
</script>

<template>
  <section v-if="items.length" id="achievements" class="mb-16" aria-labelledby="achievements-heading">
    <SectionHeading :label="t.nav.achievements" />

    <ul class="grid gap-4 sm:grid-cols-2 list-none m-0 p-0">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex flex-col gap-2 p-4 rounded-lg border transition-colors"
        style="background: var(--color-surface); border-color: var(--color-border)"
      >
        <div class="flex items-start justify-between gap-3">
          <span aria-hidden="true" class="font-mono text-lg leading-none" style="color: var(--color-yellow)">★</span>
          <span class="font-mono text-xs shrink-0" style="color: var(--color-faint)">
            <span class="sr-only">Date range: </span>
            {{ dateRange(item.start_date, item.end_date, t.experience.present) }}
          </span>
        </div>

        <h3 class="text-sm font-semibold leading-snug" style="color: var(--color-text)">
          {{ item.title }}
        </h3>

        <p class="text-xs font-mono" style="color: var(--color-accent)">
          {{ item.company }}
        </p>

        <p v-if="item.description" class="text-xs leading-relaxed" style="color: var(--color-muted)">
          {{ item.description }}
        </p>
      </li>
    </ul>
  </section>
</template>
