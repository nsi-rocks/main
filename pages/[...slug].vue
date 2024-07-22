<script setup lang="ts">
const { page, navigation } = useContent()
const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)))

const query = useRoute().query
const ldata = computed(() => {
  return Object.keys(query).includes('print') ? 'print' : 'dashboard'
})

setPageLayout(ldata.value)


definePageMeta({
  layout: false
})

</script>

<template>
  <NuxtLayout :name="ldata">
      <UDashboardNavbar>
      <template #left>
        <UBreadcrumb :links="breadcrumb">
          <template #divider>
            <span class="mx-2">/</span>
          </template>
        </UBreadcrumb>
      </template>
      </UDashboardNavbar>
      <UDashboardPanelContent class="px-4 prose prose-primary dark:prose-invert max-w-none">
        <ContentDoc />
      </UDashboardPanelContent>
  </NuxtLayout>
</template>
