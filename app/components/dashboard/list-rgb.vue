<template>
  <div class="flex flex-wrap gap-4 overflow-y-scroll">
    <LazyDashboardSingleImage v-for="img in data" :key="img" :idRgb="img.split(':')[1] || ''" />
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/rgb/user')
const delImg = async (img: string) => {
  data.value = data.value.filter((el: string) => el.split(':')[1] !== img)
  await fetch(`/api/rgb/${img}`, { method: 'DELETE' })
}
</script>

<style scoped></style>