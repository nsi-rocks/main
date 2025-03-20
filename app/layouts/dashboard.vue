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

if (!loggedIn.value && !import.meta.dev) {
  navigateTo('/')
}

const route = useRoute()
const links = computed(() => [
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
  },
])
</script>

<style scoped></style>