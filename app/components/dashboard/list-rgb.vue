<template>
  <div class="flex flex-wrap gap-4 overflow-y-scroll">
    <LazyDashboardSingleImage v-for="img in images" :key="img" :idRgb="img.split(':')[1] || ''" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ query: string }>()
const images = ref()

watchEffect(async () => {
  const data = await $fetch(`/api/rgb/user?query=${props.query}`)
  images.value = data
})

const delImg = async (img: string) => {
  data.value = data.value.filter((el: string) => el.split(':')[1] !== img)
  await fetch(`/api/rgb/${img}`, { method: 'DELETE' })
}
</script>

<style scoped></style>