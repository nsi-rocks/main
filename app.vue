<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
provide('navigation', navigation)
</script>

<template>
  <UHeader :links="mapContentNavigation(navigation.map(({children, ...nav}) => nav))">
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
    <template #logo>
      <Mogo class="block w-auto h-12" />
    </template>
  </UHeader>
  <UMain>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </UMain>
  <UFooter />
</template>
