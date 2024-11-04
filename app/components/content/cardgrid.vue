<template>
  <div
    class="grid gap-4"
    :class="`grid-cols-${cols}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  cols: number
  cclass?: any
}>()
</script>
