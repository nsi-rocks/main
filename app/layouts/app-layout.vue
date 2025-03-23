<template>
  <div class="h-screen w-screen">
    <AppsRgb v-if="appid === 'rgb'" />
    <AppsLang v-else-if="appid === 'langues'" />
  </div>
</template>

<script lang="ts" setup>
const appid = useAttrs().appid || 'default'

onMounted(() => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) {
    useHead({
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      ],
    })
  }
})
</script>

<style></style>
