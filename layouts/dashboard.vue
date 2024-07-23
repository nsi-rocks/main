<template>
  <UDashboardLayout>
    <UDashboardPanel id="layout" :width="250" :resizable="{ min: 200, max: 300, storage: 'local' }" collapsible>
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
      <UDashboardNavbar>
        <template #left>
          <UBreadcrumb :links="breadcrumb">
            <template #divider>
              <span class="mx-2">/</span>
            </template>
          </UBreadcrumb>
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent
        class="px-4 prose prose-primary dark:prose-invert max-w-none"
      >
        <slot />
      </UDashboardPanelContent>
    </UDashboardPanel>
    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" :links="links" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<script lang="ts" setup>
const { page, navigation } = useContent();
const sntQuery = queryContent("old", "snt");
const breadcrumb = computed(() =>
  mapContentNavigation(findPageBreadcrumb(navigation.value, page.value))
);
// const { data: navigation } = await useAsyncData("navigation", () =>
//   fetchContentNavigation()
// );
const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", {
  default: () => [],
  server: false,
});

const links = [
  {
    label: "Docs",
    icon: "i-heroicons-book-open",
    to: "/getting-started",
  },
  {
    label: "Pro",
    icon: "i-heroicons-square-3-stack-3d",
    to: "/pro",
  },
  {
    label: "Pricing",
    to: "/pro/pricing",
    icon: "i-heroicons-ticket",
  },
  {
    label: "Templates",
    icon: "i-heroicons-computer-desktop",
    to: "/pro/templates",
  },
  {
    label: "Releases",
    icon: "i-heroicons-rocket-launch",
    to: "/releases",
  },
];

provide("navigation", navigation);
provide("files", files);
</script>

<style></style>
