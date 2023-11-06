<template>
  <UCard :ui="{ background: 'bg-gray-50 dark:bg-gray-800 ring-gray-200 dark:ring-gray-700'}">
  <template #header>
    <div class="flex flex-row justify-center font-semibold text-lg">
    RGB : ({{ rouge }}, {{ vert }}, {{ bleu }})
    </div>
  </template>

  <template #footer>
    <UCard :style="`background-color: rgb(${rouge}, ${vert}, ${bleu})`" />
  </template>

  <div class="flex flex-col gap-4">
    <URange size="2xl" color="red" :min="0" :max="255" v-model="rouge" />
    <URange size="2xl" color="green" :min="0" :max="255" v-model="vert" />
    <URange size="2xl" color="blue" :min="0" :max="255" v-model="bleu" />
    <URange color="cool" :min="0" :max="255" v-model="gray" />
  </div>
  </UCard>

</template>

<script lang="ts" setup>
const rouge = ref(0)
const vert = ref(0)
const bleu = ref(0)
const gray = ref()

watch(gray, val => {
  rouge.value = val
  bleu.value = val
  vert.value = val
})
</script>

<style>

</style>

