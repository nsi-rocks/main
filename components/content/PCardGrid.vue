<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Features'
  },
  cols: {
    type: String,
    default: '3'
  }
})
</script>

<template>
  <section>
    <ContentSlot :use="$slots.root" />

    <h2 class="text-md">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <div :class="'grid gap-2 grid-cols-'+cols">
      <slot />
    </div>
  </section>
</template>