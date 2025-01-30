<template>
  <UPageBody>
    <AuthState>
      <template #default="{ loggedIn, user, clear, session }">
        <div class="flex flex-wrap gap-4">
          <a
            v-for="img in data"
            :key="img"
            :href="`https://rgb.nsi.rocks/${img.split(':')[1]}`"
            target="_blank"
          >
            <img
              :src="`/api/rgb/${img.split(':')[1]}?img`"
              class="w-20"
            >
          </a>
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
