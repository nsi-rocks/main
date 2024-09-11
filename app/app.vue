<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const ticket = useRoute().query.ticket

if (ticket) {
  await navigateTo('/api/auth/ticket?ticket=' + ticket)
  // try {
  //   const res = await $fetch('/api/auth/ticket', {
  //     method: 'POST',
  //     body: { ticket: ticket },
  //   });
  //   await navigateTo('/');
  // } catch (error) {
  //   console.error('Error avec le ticket :', error);
  //   await navigateTo('/');
  // }
}

useHead({
  title: 'NSI Rocks !',
  meta: [
    { name: 'description', content: 'NSI Rocks !' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})
</script>
