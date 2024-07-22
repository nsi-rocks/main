<script setup lang="ts">
const ticket = useRoute().query.ticket
if (ticket) {
  console.log(ticket);

  const res = await $fetch('https://api.nsi.rocks/ticket', {
    method: 'get',
    query: { ticket: ticket },
    credentials: 'include'
  })
  console.log(res);
  await navigateTo('/')
}


</script>

<template>
  <NuxtPage />
</template>
