<template>
  <AuthState>
    <template #default="{ loggedIn, user }">
      <div
        v-if="loggedIn"
        class="flex flex-row justify-between w-full"
      >
        <UBadge
          variant="soft"
          size="lg"
        >
          <Icon name="ph:student-fill" />
          {{ user?.firstName }}
        </UBadge>

        <UButton
          variant="ghost"
          @click="logout"
        >
          Déconnexion
        </UButton>
      </div>
    </template>
  </AuthState>
</template>

<script lang="ts" setup>
const logout = async () => {
  useUserSession().clear()
  await navigateTo('/')
}
</script>

<style>

</style>
