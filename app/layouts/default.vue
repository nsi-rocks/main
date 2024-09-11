<template>
  <UDashboardLayout>
    <UDashboardPanel
      id="layout"
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar>
        <template #left>
          <UDropdown :items="matieres" :popper="{ placement: 'bottom-start' }">
            <UButton
              label="Navigation"
              trailing-icon="heroicons:chevron-down-20-solid"
              variant="solid"
              color="gray"
            />
          </UDropdown>
        </template>
        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
      <UDashboardSidebar>
        <template #header>
          <UContentSearchButton label="Recherche..." />
        </template>
        <UNavigationTree :links="mapContentNavigation(path == '/' ? navigation : navigation.filter(el => el._path == '/'+path.split('/')[1]) || [])" :multiple="path == '/' ? false : true" :default-open="false" />
        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #left>
          <UBreadcrumb v-if="false" :links="breadcrumb">
            <template #divider>
              <span class="mx-2">/</span>
            </template>
          </UBreadcrumb>
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent
        class="px-4 prose prose-primary dark:prose-invert max-w-none first:prose-h2:mt-0"
      >
        <slot />
      </UDashboardPanelContent>
    </UDashboardPanel>
    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<script lang="ts" setup>
const path = computed(() => useRoute().path)
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: page } = await useAsyncData('page', () => queryContent(useRoute().path).findOne() || undefined, { watch: [path] })

const { data: files } = useLazyFetch('/api/search.json', { default: () => [], server: false })

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
