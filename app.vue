<script setup lang="ts">
const { navigation } = useContent()
const urls = ['http://localhost:3000', 'https://api.nicolas.zone']

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

const ticket = useRoute().query.ticket
if (ticket) {
  console.log(ticket);

  const res = await $fetch(urls[1]+'/ticket', {
    method: 'get',
    query: { ticket: ticket },
    credentials: 'include'
  })
}

const links = [ {
  label: 'ENT Hauts-de-France',
  icon: 'i-heroicons-user-group',
  to: 'https://enthdf.fr'
}, {
  label: 'Excalidraw',
  icon: 'i-heroicons-pencil',
  to: 'https://excalidraw.com',
}, {
  label: 'Capytale',
  icon: 'i-heroicons-code-bracket-square',
  to: 'https://capytale2.ac-paris.fr'
  }]

const getTest = async () => {
  const res = await $fetch('https://api.nicolas.zone/castest', {
    credentials: 'include'
  })
  console.log(res);
}
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
      <UDocsSearchButton label="" />
      <UButton label="go" @click="getTest" />
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
