<script lang="ts" setup>
const lp = useLocalePath()
const route = useRoute()

const unlocallizedPath = computed(() => {
  return route.path.replace(/^\/(fr|en)/, '') || '/'
})

const links = computed(() => [
  {
    label: 'NSI',
    to: lp('/nsi'),
    active: unlocallizedPath.value.startsWith('/nsi'),
  },
  {
    label: 'SNT',
    to: lp('/snt'),
    active: unlocallizedPath.value.startsWith('/snt'),
  },
  {
    label: 'ARTICLES',
    to: lp('/articles'),
    active: unlocallizedPath.value.startsWith('/articles'),
  },
])
</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <Logo class="block w-auto h-10" />
    </template>
    <UNavigationMenu :items="links" />
    <template #right>
      <!-- <UContentSearchButton label="" /> -->
      <ClientOnly>
        <UColorModeButton />
        <I18nSwitch />
      </ClientOnly>
    </template>
  </UHeader>
</template>

<style scoped>

</style>
