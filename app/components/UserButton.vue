<template>
  <div class="flex items-center">
    <NuxtLink v-if="!store.session.loggedIn" to="https://enthdf.fr/cas/login?service=https://nsi.rocks">
      <UAvatar icon="material-symbols:bolt" />
    </NuxtLink>
    <span v-else class="cursor-pointer" @click="logout">
      <UAvatar
        :alt="`${store.session.user.firstName} ${store.session.user.lastName}`"
        :src="store.session.user.avatar"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
const store = useStore()

const logout = async () => {
  store.session.clear()
  await navigateTo('/')
}
</script>

<style>

</style>
