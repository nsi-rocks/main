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
const links = [
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

if (await allows(adminOrDev)) {
  links.push({
    label: 'Eleves',
    to: '/dashboard/eleves',
    active: route.path.startsWith('/dashboard/eleves'),
  })
  links.push({
    label: 'Logs',
    to: '/dashboard/logs',
    active: route.path.startsWith('/dashboard/logs'),
  })
}
</script>

<style scoped></style>