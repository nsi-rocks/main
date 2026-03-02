<script setup lang="ts">
defineProps<{
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
}>()
</script>

<template>
  <UCard :variant="variant">
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>

    <slot />

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </UCard>
</template>
