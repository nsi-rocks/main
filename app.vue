<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';
const store = useStore()

const ticket = useRoute().query.ticket
const { navigation } = useContent()

if (ticket) {
  console.log(ticket);

  try {
    const res = await $fetch(useFU('/ticket'), {
      method: 'get',
      query: { ticket: ticket },
      credentials: 'include'
    });
    console.log(res);
    await navigateTo('/');
  } catch (error) {
    console.error('Error avec le ticket :', error);
    await navigateTo('/');
  }
}

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

const getUserData = async () => {
  const res = await $fetch(useFU('/castest'), {
    method: 'get',
    credentials: 'include'
  })
  console.log(res);
}

if(useCookie('jwt').value) {
  console.log('jwt cookie found');
  getUserData();
} else {
  console.log('no jwt cookie found');
}
</script>

<template>
  <NuxtLayout>
  <UButton @click="getUserData">Get user data</UButton>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <LazyUContentSearch :files="files" :navigation="navigation" />
  </ClientOnly>
</template>
