<template>
  <NuxtLayout>
  <div class="gradient" />
  <ULandingHero :links="page.hero.links">
    <template #title>
      <span v-html="page.hero.title" />
    </template>

    <template #description>
      <span v-html="page.hero.description" />
    </template>
  </ULandingHero>

  <div class="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
    <UPageCard
        v-for="(card, index) of page.features"
        :key="index"
        v-bind="card">
    <div class="flex flex-row justify-around">
      <UButton variant="outline" v-for="l of card.links" :label="l.label" :to="l.to" />
    </div>
    </UPageCard>
  </div>
</NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
useHead({
  title: 'NSI Rocks !'
})
</script>

<style>
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(50% 50% at 50% 50%, #00DC82 0%, rgba(0, 220, 130, 0) 100%);
  filter: blur(180px);
  opacity: 0.2;
  z-index: -1;
}
</style>

