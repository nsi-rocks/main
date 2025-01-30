<template>
  <UPageBody>
    <AuthState>
      <template #default="{ loggedIn, user, clear, ready }">
        <p>{{ loggedIn }}</p>
        <p>{{ user }}</p>
        <p>{{ ready }}</p>
        <div class="flex flex-wrap gap-4">
          <img
            v-for="img in data"
            :key="img"
            :src="`/api/rgb/${img.split(':')[1]}?img`"
            class="w-20"
            @click="delImg(img.split(':')[1])"
          >
        </div>
      </template>
    </AuthState>
  </UPageBody>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
})

const { data } = await useFetch('/api/rgb/user')
const delImg = async (img: string) => {
  data.value = data.value.filter((el: string) => el.split(':')[1] !== img)
  await fetch(`/api/rgb/${img}`, { method: 'DELETE' })
}
</script>

<style scoped>

</style>
