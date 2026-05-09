<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="flex items-center gap-3 mb-8">
    <span aria-hidden="true" class="font-mono text-sm select-none" style="color: var(--color-accent)">//</span>
    <h2 class="font-mono text-xs font-medium tracking-widest uppercase whitespace-nowrap" style="color: var(--color-muted)">
      {{ label }}
    </h2>
    <div aria-hidden="true" class="flex-1 h-px" style="background: var(--color-border)" />
  </div>
</template>
