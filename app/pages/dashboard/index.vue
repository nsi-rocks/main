<template>
  <UDashboardPanel resizable :min-size="20" :max-size="80" :default-size="30">
    <template #header>
      <UDashboardNavbar title="Images" />
    </template>
    <template #body>
      coucou
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped></style>