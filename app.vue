<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';

const ticket = useRoute().query.ticket
const { navigation } = useContent()

if (ticket) {
  console.log(ticket);

  const res = await $fetch('https://api.nsi.rocks/ticket', {
    method: 'get',
    query: { ticket: ticket },
    credentials: 'include'
  })
  console.log(res);
  await navigateTo('/')
}

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <LazyUContentSearch :files="files" :navigation="navigation" />
  </ClientOnly>
</template>
