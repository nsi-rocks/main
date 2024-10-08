<template>
  <NuxtLayout appid="rgb">
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<script setup lang="ts">
const ticket = useRoute().query.ticket

if (ticket) {
  await navigateTo('/api/auth/ticket?ticket=' + ticket)
}

useHead({
  title: 'NSI Rocks !',
  meta: [
    { name: 'description', content: 'NSI Rocks !' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})
</script>
