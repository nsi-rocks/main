<template>
  <UHeader :links="mapContentNavigation((navigation ?? []).map(({ children, ...nav }) => nav))">
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation ?? [])" />
    </template>
    <template #logo>
      <Logo class="block w-auto h-10" />
    </template>

    <template #right>
      <UContentSearchButton label="" />
      <UColorModeToggle />
    </template>
  </UHeader>
  <UMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>

  <ClientOnly>
    <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
  </ClientOnly>
</template>

<script setup lang="ts">
const ticket = useRoute().query.ticket
const { data: files } = useLazyFetch('/api/search.json', { default: () => [], server: false })

if (ticket) {
  await navigateTo('/api/auth/ticket?ticket=' + ticket)
  // try {
  //   const res = await $fetch('/api/auth/ticket', {
  //     method: 'POST',
  //     body: { ticket: ticket },
  //   });
  //   await navigateTo('/');
  // } catch (error) {
  //   console.error('Error avec le ticket :', error);
  //   await navigateTo('/');
  // }
}

useHead({
  title: 'NSI Rocks !',
  meta: [
    { name: 'description', content: 'NSI Rocks !' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>
