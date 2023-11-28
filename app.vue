<script setup lang="ts">
const { navigation } = useContent();

const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
  default: () => [],
  server: false,
});

const links = [
  {
    label: "ENT Hauts-de-France",
    icon: "i-heroicons-user-group",
    to: "https://enthdf.fr",
  },
  {
    label: "Excalidraw",
    icon: "i-heroicons-pencil",
    to: "https://excalidraw.com",
  },
  {
    label: "Capytale",
    icon: "i-heroicons-code-bracket-square",
    to: "https://capytale2.ac-paris.fr",
  },
];
</script>

<template>
  <UHeader :links="mapContentNavigation(navigation.map(({ children, ...nav }) => nav))">
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
    <template #logo>
      <Mogo class="block w-auto h-10" />
    </template>

    <template #right>
      <UDocsSearchButton label="" />

      <UColorModeToggle />
    </template>
  </UHeader>
  <UMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>
  <UFooter>
  <template #left>
    <a href="mailto: contact@nsi.rocks">développé par Mathieu NICOLAS</a>
  </template>
    <template #center>
      <a href="http://creativecommons.org/licenses/by-sa/4.0/" class="flex flex-row"
          ><img
            style="height: 22px"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" /><img
            style="height: 22px"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" /><img
            style="height: 22px"
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
        /></a>
    </template>
  </UFooter>

  <ClientOnly>
    <LazyUDocsSearch :files="files" :navigation="navigation" :links="links" />
  </ClientOnly>
</template>
