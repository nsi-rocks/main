<template>
  <UContainer>
  <UPage>
  <template #left>
  <UAside>
    <UDocsSearchButton class="mb-4" label="Rechercher..." />
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
    <UDocsToc v-if="page.body?.toc?.links?.length" :links="page.body.toc.links" />
  </template>
  </UPage>
  </UPage>
</UContainer>
</template>

<script lang="ts" setup>
const { page, navigation } = useContent()

const breadcrumb = computed(() => findPageBreadcrumb(navigation.value, page.value))

const nav = computed(() => {
  return navigation.value.filter(el => page.value._path.startsWith(el._path))
})
const quizz = await queryContent().where({ quizz: {$eq: true }}).find()
</script>

<style>

</style>

