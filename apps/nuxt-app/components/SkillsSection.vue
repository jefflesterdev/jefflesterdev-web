<script setup lang="ts">
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { SkillGroup } from '@jld/types'

const props = defineProps<{ locale: Locale }>()
const t = computed(() => useTranslations(props.locale))

const groups = ref<SkillGroup[]>([])
const { skills } = useApi()

const proficiencyClass: Record<string, string> = {
  expert:     'chip-expert',
  proficient: 'chip-proficient',
  familiar:   'chip-familiar',
}

onMounted(() => {
  skills().then(data => { groups.value = data }).catch(console.error)
})
</script>

<template>
  <section v-if="groups.length" id="skills" class="mb-16" aria-labelledby="skills-heading">
    <SectionHeading :label="t.nav.skills" />

    <div class="flex flex-col gap-8">
      <div v-for="group in groups" :key="group.id">
        <p
          :id="`skill-group-${group.id}`"
          class="font-mono text-xs uppercase tracking-widest mb-3"
          style="color: var(--color-faint)"
        >
          {{ group.name }}
        </p>
        <ul class="flex flex-wrap gap-2 list-none m-0 p-0" :aria-labelledby="`skill-group-${group.id}`">
          <li v-for="skill in group.skills" :key="skill.id">
            <span
              :class="proficiencyClass[skill.proficiency ?? ''] ?? 'chip-familiar'"
              :title="skill.proficiency ? `${skill.proficiency} proficiency` : undefined"
            >
              {{ skill.name }}
              <span v-if="skill.proficiency" class="sr-only"> ({{ skill.proficiency }})</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
