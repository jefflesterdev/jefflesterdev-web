<script setup lang="ts">
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { Experience } from '@jld/types'

const props = defineProps<{ locale: Locale }>()
const t = computed(() => useTranslations(props.locale))

const items = ref<Experience[]>([])
const { experience } = useApi()

onMounted(() => {
  experience().then(data => { items.value = data }).catch(console.error)
})
</script>

<template>
  <section v-if="items.length" id="experience" class="mb-16" aria-labelledby="experience-heading">
    <SectionHeading :label="t.nav.experience" />

    <div class="relative flex flex-col gap-10 pl-6">
      <div aria-hidden="true" class="timeline-line" />

      <article v-for="exp in items" :key="exp.id" class="relative">
        <div
          aria-hidden="true"
          class="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2"
          style="border-color: var(--color-accent); background: var(--color-bg)"
        />

        <p class="font-mono text-xs mb-1" style="color: var(--color-faint)">
          <time>{{ exp.start_date }}</time>
          <span aria-hidden="true"> – </span>
          <span class="sr-only"> to </span>
          <time>{{ exp.end_date ?? t.experience.present }}</time>
          <span
            v-if="exp.employment_type"
            class="ml-2 px-1.5 py-0.5 rounded text-xs"
            style="background: var(--color-raised); color: var(--color-muted)"
          >
            {{ exp.employment_type }}
          </span>
        </p>

        <h3 class="text-base font-semibold" style="color: var(--color-text)">{{ exp.title }}</h3>
        <p class="text-sm mb-2" style="color: var(--color-accent)">
          {{ exp.company }}{{ exp.location ? ` · ${exp.location}` : '' }}
        </p>

        <p v-if="exp.summary" class="text-sm mb-3 leading-relaxed" style="color: var(--color-muted)">
          {{ exp.summary }}
        </p>

        <ul v-if="exp.items.length" class="flex flex-col gap-1.5" aria-label="Responsibilities and achievements">
          <li
            v-for="item in exp.items"
            :key="item.id"
            class="flex gap-2.5 text-sm"
            style="color: var(--color-muted)"
          >
            <span
              aria-hidden="true"
              class="font-mono mt-0.5 flex-shrink-0 text-xs"
              :style="{ color: item.type === 'achievement' ? 'var(--color-yellow)' : 'var(--color-faint)' }"
            >
              {{ item.type === 'achievement' ? '★' : '·' }}
            </span>
            <span v-if="item.type === 'achievement'" class="sr-only">Achievement: </span>
            {{ item.content }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
