<template>
  <UDashboardPanel
    id="eleves-1"
    resizable
    :min-size="20"
    :max-size="80"
    :default-size="30"
  >
    <template #header>
      <UDashboardNavbar title="Logs">
        <template #right>
          <UInput
            v-model="search"
            placeholder="Rechercher"
            class="w-40"
          />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <UCard
        v-for="log in data?.filter(el => el.logData.includes(search))"
        :key="log.id"
        hydrate-on-view
      >
        <div class="grid grid-cols-3 justify-items-start">
          <UBadge
            variant="soft"
            size="lg"
            :color="typeColor(log.logType)"
          >
            {{ log.logType }}
          </UBadge>
          <UBadge
            variant="soft"
            size="lg"
            color="warning"
          >
            {{ formatDate(log.timestamp) }}
          </UBadge>
          <span class="ml-auto">{{ log.logData }}</span>
        </div>
      </UCard>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})
if (await denies(adminOrDev)) {
  navigateTo('/')
}

const search = ref('')
const { data } = await useFetch('/api/logs')

const typeColor = (type: string) => {
  switch (type) {
    case 'first-login':
      return 'success'
    case 'login':
      return 'info'
    case 'ERROR':
      return 'error'
    default:
      return 'primary'
  }
}
</script>

<style scoped></style>
