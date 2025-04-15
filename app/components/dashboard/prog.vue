<template>
  <UDashboardPanel
    resizable
    :min-size="20"
    :max-size="80"
    :default-size="30"
  >
    <template #header>
      <UDashboardNavbar title="Images" />
    </template>
    <template #body>
      <MDEditor
        v-model="data"
        class="h-96"
      />
      <pre>{{ data }}</pre>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
const data = ref('')
</script>

<style scoped></style>
