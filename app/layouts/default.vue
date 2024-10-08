<template>
  <div>
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
      <div class="px-8">
        <UPage>
          <template #left>
            <UAside>
              <template #top>
                <UContentSearchButton label="Recherche..." />
              </template>
              <UNavigationTree :links="mapContentNavigation(path == '/' ? navigation ?? [] : localNav)" :multiple="path == '/' ? false : true" :default-open="false" />
            </UAside>
          </template>
          <slot />
        </UPage>
      </div>
    </UMain>

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content'

const path = computed(() => useRoute().path)
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const localNav = computed(() => (navigation.value ?? []).filter(el => el._path == '/' + path.value.split('/')[1]) || [])
const { data: page } = await useAsyncData('page', () => queryContent(useRoute().path).findOne() || undefined, { watch: [path] })

const breadcrumb = computed(() => page.value === undefined ? [] : mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)))

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

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

<style></style>
