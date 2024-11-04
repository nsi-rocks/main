<template>
  <ClientOnly>
    <div class="flex flex-row justify-between">
      <DevOnly>
        <UBadge
          variant="soft"
          size="lg"
        >
          <Icon name="ph:student-fill" />
          Mathieu
        </UBadge>

        <UButton
          variant="ghost"
          @click="logout"
        >
          Déconnexion
        </UButton>
      </DevOnly>
      <div
        v-if="store.session.loggedIn"
        class="flex flex-row justify-between w-full"
      >
        <UBadge
          variant="soft"
          size="lg"
        >
          <Icon name="ph:student-fill" />
          {{ store.session.user?.firstName }}
        </UBadge>

        <UButton
          variant="ghost"
          @click="logout"
        >
          Déconnexion
        </UButton>
      </div>
    </div>
  </ClientOnly>
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
