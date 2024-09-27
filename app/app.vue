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
      <ClientOnly>
        <UColorModeToggle />
        <UserButton />
      </ClientOnly>
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
}

useHead({
  title: 'NSI Rocks !',
  meta: [
    { name: 'description', content: 'NSI Rocks !' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const links = [
  {
    label: 'ENT Hauts-de-France',
    icon: 'i-heroicons-user-group',
    to: 'https://enthdf.fr',
  },
  {
    label: 'Excalidraw',
    icon: 'i-heroicons-pencil',
    to: 'https://excalidraw.com',
  },
  {
    label: 'Capytale',
    icon: 'i-heroicons-code-bracket-square',
    to: 'https://capytale2.ac-paris.fr',
  },
]
</script>
