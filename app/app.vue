<template>
  <UApp>
    <UBanner
      v-if="isFirefox"
      title="Ce site n'est pour l'instant pas complètement optimisé pour le navigateur Firefox, veuillez utiliser Google Chrome."
      close
    />
    <NuxtLayout :appid="appid">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { getSubdomain } from 'tldts'

const ticket = useRoute().query.ticket

const appid = getSubdomain(useRequestURL().hostname) || ''

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

const isFirefox = ref(false)

onMounted(() => {
  // Vérifier si l'utilisateur utilise Firefox
  const userAgent = navigator.userAgent.toLowerCase()
  isFirefox.value = userAgent.includes('firefox')
})
</script>
