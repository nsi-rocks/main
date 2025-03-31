<template>
  <NuxtLink :href="`/dashboard/rgb/${idRgb}`">
    <div class="w-20 h-20">
      <img
        :src="`/api/rgb/${idRgb}?img`"
        class="w-20"
        loading="lazy"
      >
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{ idRgb: string }>()
</script>

<style scoped></style>
