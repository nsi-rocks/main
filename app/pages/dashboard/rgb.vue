<template>
  <UDashboardPanel
    id="rgb-1"
    resizable
    :min-size="20"
    :max-size="80"
    :default-size="30"
  >
    <template #header>
      <UDashboardNavbar title="Images">
        <template #right>
          <UTabs
            v-model="tab"
            :items="items"
            default-value="all"
            size="sm"
            class="w-40"
            :content="false"
          />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <DashboardListRgb :query="tab" />
    </template>
  </UDashboardPanel>
  <UDashboardPanel
    id="rgb-2"
    resizable
    :min-size="20"
    :max-size="80"
    :default-size="30"
  >
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
  layout: 'dashboard',
})

const tab = ref('my')
const tmp = reactive({ my: '', all: '' })

const route = useRoute()

// watch(tab, (newValue, oldValue) => {
//   if (!oldValue) return;
//   tmp[oldValue] = route.params.id as string; // Stocke l'ID précédent

//   // Évite la redirection si on est déjà sur /dashboard/rgb
//   if (route.path !== "/dashboard/rgb") {
//     navigateTo("/dashboard/rgb");
//   }
// });

const items = [
  {
    label: 'Perso',
    value: 'my',
  },
  {
    label: 'Toutes',
    value: 'all',
  },
]
</script>

<style scoped></style>
