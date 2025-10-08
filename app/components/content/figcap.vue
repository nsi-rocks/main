<template>
  <figure class="max-h-full">
    <img
      :src="img"
      class="h-full ratio-1/1"
    >
    <figcaption class="text-center text-lg font-semibold">
      {{ cap }}
    </figcaption>
  </figure>
</template>

<script lang="ts" setup>
defineProps({
  img: String,
  cap: String,
})
</script>

<style scoped>

</style>
