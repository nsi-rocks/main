<template>
  <UDashboardLayout>
  <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
    <UDashboardNavbar>
    <template #left><TeamsDropdown /></template>
    <template #right><UColorModeSelect /></template>
    </UDashboardNavbar>
    <UDashboardSidebar>
      <template #header>
        <UContentSearchButton label="Recherche..." />
      </template>
      <ContentNavigation v-slot="{ navigation }" :query="sntQuery">
      <UNavigationTree :links="mapContentNavigation(navigation[0].children)" />
      </ContentNavigation>
    </UDashboardSidebar>
    </UDashboardPanel>
    <UDashboardPanel grow>
      <slot />  
    </UDashboardPanel>
  <ClientOnly>
    <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
  </ClientOnly>
  </UDashboardLayout>
</template>

<script lang="ts" setup>
const sntQuery = queryContent('old', 'snt')
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

const links = [{
  label: 'Docs',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'Pro',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'Pricing',
  to: '/pro/pricing',
  icon: 'i-heroicons-ticket'
}, {
  label: 'Templates',
  icon: 'i-heroicons-computer-desktop',
  to: '/pro/templates'
}, {
  label: 'Releases',
  icon: 'i-heroicons-rocket-launch',
  to: '/releases'
}]

provide('navigation', navigation)
provide('files', files)
</script>

<style>

</style>