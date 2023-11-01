<template>
  <UContainer>
  <UPage>
  <template #left>
  <UAside>
    <UNavigationTree :links="mapContentNavigation(navigation)" />
  </UAside>
  </template>

  <UPageHeader v-bind="page">
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
  </UPage>
</UContainer>
</template>

<script lang="ts" setup>
const navigation = inject<Ref<NavItem[]>>('navigation')

import type { NavItem } from '@nuxt/content/dist/runtime/types'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const breadcrumb = computed(() => findPageBreadcrumb(navigation.value, page.value))
</script>

<style>

</style>

