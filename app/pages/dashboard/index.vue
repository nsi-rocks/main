<template>
  <UDashboardPanel resizable :min-size="20" :max-size="80" :default-size="30">
    <template #header>
      <UDashboardNavbar title="Images" />
    </template>
    <template #body>
      <Can :ability="adminOrDev">
        c'est oui
      </Can>
      <Cannot :ability="adminOrDev">
        c'est non
      </Cannot>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped></style>