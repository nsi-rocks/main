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
        <UPage v-if="appid === 'default'">
          <slot />
        </UPage>
        <Rgb v-else-if="appid === 'rgb'" />
      </div>
    </UMain>

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content'

const appid = useAttrs().appid || 'default'

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

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

<style></style>
