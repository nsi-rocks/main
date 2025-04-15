<template>
  <div class="flex items-center">
    <AuthState>
      <template #default="{ loggedIn, user, clear }">
        <span
          v-if="loggedIn && user"
          class="cursor-pointer"
          @click="logout"
        >
          <UAvatar :alt="`${user.firstName} ${user.lastName}`" />
        </span>
        <NuxtLink
          v-else
          class="cursor-pointer"
          @click="login"
        >
          <UAvatar icon="material-symbols:bolt" />
        </NuxtLink>
      </template>
      <template #placeholder>
        <NuxtLink
          class="cursor-pointer"
          @click="login"
        >
          <UAvatar icon="material-symbols:bolt" />
        </NuxtLink>
      </template>
    </AuthState>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ redirectApp?: string }>()

const logout = async () => {
  useUserSession().clear()
  await navigateTo('/')
}

const login = async () => {
  if (props.redirectApp && ['rgb', 'langues'].includes(props.redirectApp)) {
    const cookie = useCookie('redirection', {
      maxAge: 60,
      domain: '.nsi.rocks',
    })
    cookie.value = props.redirectApp
  }
  if (import.meta.dev)
    await navigateTo('https://localhost.com:3000/api/auth/adminLogin', { external: true })
  else
    await navigateTo('https://enthdf.fr/cas/login?service=https://nsi.rocks', { external: true })
}
</script>

<style></style>
