<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
provide('navigation', navigation)

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })
</script>

<template>
  <UHeader :links="mapContentNavigation(navigation.map(({children, ...nav}) => nav))">
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
    <template #logo>
      <Mogo class="block w-auto h-10" />
    </template>

    <template #right>
      <UDocsSearchButton :label="null" />

      <UColorModeToggle />
    </template>

  </UHeader>
  <UMain>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </UMain>
  <UFooter />
  
  <ClientOnly>
    <LazyUDocsSearch :files="files" :navigation="navigation" :links="links" />
  </ClientOnly>
</template>
