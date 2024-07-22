<template>
  <UHeader :links="mapContentNavigation(navigation)">
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
    <template #logo>
      <Mogo class="block w-auto h-10" />
    </template>

    <template #right>
      <UContentSearchButton label="" />
      <UColorModeToggle />
    </template>
  </UHeader>
  <UMain>
  <UContainer>
  <UPage>
  <template #left>
  <UAside>
    <UContentSearchButton class="mb-4" label="Rechercher..." />
    <UNavigationTree v-if="nav.length > 0" :links="mapContentNavigation(nav[0].children)" />
  </UAside>
  </template>

  <UPage>
  <UPageHeader v-bind="page">
    <template #description v-if="page.description">
    <MDC :value="page.description" />
    </template>
    <template #headline>
      <NuxtLink v-for="(link, index) in breadcrumb" :key="index" :to="link._path" :class="[index < breadcrumb.length - 1 && 'text-gray-500 dark:text-gray-400']" class="flex items-center gap-1.5 group">
        <span :class="[index < breadcrumb.length - 1 && 'group-hover:text-gray-700 dark:group-hover:text-gray-200']">{{ link.title }}</span>

        <UIcon v-if="index < breadcrumb.length - 1" name="i-heroicons-chevron-right" class="w-4 h-4" />
      </NuxtLink>
    </template>
  </UPageHeader>

  <UPageBody class="px-4" prose>
      <slot />
  </UPageBody>

  <template #right>
    <UAside v-if="page.quizz" :ui="{ wrapper: 'lg:px-0' }">
    <p class="font-semibold">Tous les quizz</p>
    <UNavigationTree :links="mapContentNavigation(quizz)" />
    </UAside>
    <UContentToc v-if="page.body?.toc?.links?.length" :links="page.body.toc.links" />
  </template>
  </UPage>
  </UPage>
</UContainer>

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
    <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
  </ClientOnly>
</template>

<script lang="ts" setup>
const { page, navigation } = useContent()

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

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

const breadcrumb = computed(() => findPageBreadcrumb(navigation.value, page.value))

const nav = computed(() => {
  return navigation.value.filter(el => page.value._path.startsWith(el._path))
})
const quizz = await queryContent().where({ quizz: {$eq: true }}).find()
</script>

<style>

</style>

