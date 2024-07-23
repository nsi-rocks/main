<template>
  <UCard :ui="{ body: { base: 'grid grid-cols-2'}}" class="w-2/3 m-auto" v-if="false">
    <ContentNavigation v-slot="{ navigation }" :query="nsiQuery">
      <UNavigationTree :links="mapContentNavigation(navigation[0].children)" />
    </ContentNavigation>
    <ContentNavigation v-slot="{ navigation }" :query="sntQuery">
      <UNavigationTree :links="mapContentNavigation(navigation[0].children)" />
    </ContentNavigation>
  </UCard>
  <NuxtLayout name="dashboard">
        <UDashboardCard title="Recent sales" description="You made 265 sales this month." icon="heroicons:chart-bar">
          <UProgress />
        </UDashboardCard>

        <div class="grid lg:grid-cols-2 gap-4 mt-4" v-for="i in 2">
          <UDashboardCard title="Coucou" icon="heroicons:chart-bar" description="Ceci">
          Coucou
          </UDashboardCard>
          <UDashboardCard title="Coucou" icon="heroicons:chart-bar" description="Ceci est tout à fait sympatoche.">
          Coucou
          </UDashboardCard>
        </div>
      <UDashboardCard>
        <ContentNavigation v-slot="{ navigation }" :query="sntQuery">
        <UDashboardSidebarLinks :links="mapContentNavigation(navigation[0].children)" />
        </ContentNavigation>
      </UDashboardCard>
      <UDashboardCard>
        <ContentNavigation v-slot="{ navigation }" :query="sntQuery">
        <UNavigationTree :links="mapContentNavigation(navigation[0].children)" />
        </ContentNavigation>
      </UDashboardCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

const nsiQuery = queryContent('old', 'nsi')
const sntQuery = queryContent('old', 'snt')
// const { page, navigation } = useContent()

// const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
useHead({
  title: 'NSI Rocks !'
})
</script>