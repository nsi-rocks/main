<script setup lang="ts">

const query = useRoute().query
const ldata = computed(() => {
  return Object.keys(query).includes('print') ? 'print' : 'default'
})

setPageLayout(ldata.value)


definePageMeta({
  layout: false
})

</script>

<template>
  <NuxtLayout :name="ldata">
    <ContentDoc />
  </NuxtLayout>
</template>
