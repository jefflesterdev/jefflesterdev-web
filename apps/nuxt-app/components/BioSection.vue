<script setup lang="ts">
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'

const props = defineProps<{ bio: string; locale: Locale }>()
const t = computed(() => useTranslations(props.locale))
const paragraphs = computed(() => props.bio.split('\n\n').filter(Boolean))
</script>

<template>
  <section id="bio" class="mb-16" aria-labelledby="bio-heading">
    <SectionHeading :label="t.nav.bio" />
    <div class="flex flex-col gap-4">
      <p
        v-for="(paragraph, i) in paragraphs"
        :key="i"
        class="text-sm leading-relaxed"
        style="color: var(--color-muted)"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>
