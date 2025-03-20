<template>
  <UDashboardGroup>
    <UDashboardSidebar>
      <template #header>
        <NuxtLink to="/" class="font-bold text-xl">
          <Logo />
        </NuxtLink>
      </template>
      <template #default>
        <UNavigationMenu :items="links" orientation="vertical" />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>

<script lang="ts" setup>
const { loggedIn } = useUserSession()

if (await denies(userOrDev)) {
  navigateTo('/')
}

const route = useRoute()
const links = computed(() => {
  const data = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      active: route.path === '/dashboard',
    },
    {
      label: 'RGB',
      to: '/dashboard/rgb',
      active: route.path.startsWith('/dashboard/rgb'),
    },
    {
      label: 'API',
      to: '/dashboard/api',
      active: route.path.startsWith('/dashboard/api'),
    }
  ]

  if (import.meta.dev) {
    data.push({
      label: 'Eleves',
      to: '/dashboard/eleves',
      active: route.path.startsWith('/dashboard/eleves'),
    })
    data.push({
      label: 'Logs',
      to: '/dashboard/logs',
      active: route.path.startsWith('/dashboard/logs'),
    })
  }
  return data
})
</script>

<style scoped></style>