<template>
  <UDashboardPanel id="rgb-1" resizable :min-size="20" :max-size="80" :default-size="30">
    <template #header>
      <UDashboardNavbar title="Images" />
    </template>
    <template #body>
      <DashboardListRgb />
    </template>
  </UDashboardPanel>
  <UDashboardPanel id="rgb-2" resizable :min-size="20" :max-size="80" :default-size="30">
    <template #header>
      <UDashboardNavbar title="Détails" />
    </template>
    <template #body>
      <NuxtPage />
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped></style>