<template>
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
</template>

<script lang="ts" setup>
const path = computed(() => useRoute().path)
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const localNav = computed(() => (navigation.value ?? []).filter(el => el._path == '/' + path.value.split('/')[1]) || [])
const { data: page } = await useAsyncData('page', () => queryContent(useRoute().path).findOne() || undefined, { watch: [path] })

const breadcrumb = computed(() => page.value === undefined ? [] : mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)))

// const breadcrumb = computed(() => {
//   if(page.value !== undefined) {
//     const bcrumb = findPageBreadcrumb(navigation.value, page.value)
//     const bcrumbPage: NavItem[] = page.value._path?.endsWith('_dir') ? [] : [{
//       _path: page.value._path || '',
//       title: page.value.title || '',
//       children: []
//     }]

//     return page.value.length === 0
//     ? [{ label: 'test' }]
//     : mapContentNavigation(bcrumb.concat(bcrumbPage))
//   }
// }
// );

const matieres = [[{
  label: 'Accueil',
  to: '/',
}, {
  label: 'NSI',
  to: '/nsi',
}, {
  label: 'SNT',
  to: '/snt',
}], [{
  label: 'Articles',
  to: '/articles',
}]]
</script>

<style></style>
