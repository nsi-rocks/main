<template>
  <UDashboardLayout>
    <UDashboardPanel id="layout" :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar>
        <template #left>coucou</template>
      </UDashboardNavbar>
      <UDashboardSidebar>
        <template #header>
          <UContentSearchButton label="Recherche..." />
        </template>
        <UNavigationTree :links="mapContentNavigation(navigation)" />
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
  </UDashboardLayout>
</template>

<script lang="ts" setup>
const { page, navigation } = useContent();
const breadcrumb = computed(() =>
  mapContentNavigation(findPageBreadcrumb(navigation.value, page.value))
);
</script>

<style></style>
