<template>
  <div>
    coucou
  </div>
</template>

<script setup lang="ts">
import { getSubdomain } from 'tldts'

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    const appid = getSubdomain(useRequestURL().hostname) || ''
    return ['rgb'].includes(appid)
  },
})
</script>

<style scoped></style>
