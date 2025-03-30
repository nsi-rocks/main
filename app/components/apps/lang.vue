<template>
  <UDashboardGroup>
    <UDashboardPanel id="langues-1" :max-size="80" :min-size="30" :default-size="100">
      <template #header>
        <UDashboardNavbar title="Accueil">
          <template #right>
            <UDrawer>
              <UButton icon="i-lucide-kanban" variant="soft" rounded class="mr-1 cursor-pointer"></UButton>

              <template #header>
                <div class="flex flex-row justify-end">
                  <UButton v-if="simuStatus === 'idle' || simuStatus === 'success'" icon="i-lucide-dices" variant="soft"
                    size="xl" rounded class="ml-auto cursor-pointer" @click="simuRun">Simuler
                  </UButton>
                  <UButton v-else icon="i-lucide-loader" variant="soft" size="xl" rounded class="ml-auto cursor-pointer"
                    :ui="{ leadingIcon: 'animate-spin' }" disabled>Simulation en cours</UButton>
                </div>
              </template>
              <template #body>
                <LangBoard :tabs="tabs" :ateliers="ateliers" @dashboard-mount="boardMount"
                  @dashboard-unmount="boardUnmount" />
              </template>
            </UDrawer>
            <UDrawer>
              <UButton icon="i-lucide-gauge" variant="soft" rounded class="mr-4 cursor-pointer"></UButton>

              <template #content>
                <LangStats :tabs="tabs" :ateliers="ateliers" @dashboard-mount="boardMount"
                  @dashboard-unmount="boardUnmount" />
              </template>
            </UDrawer>
            <UColorModeSwitch />
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <AuthState>
          <template #default="{ loggedIn, user, clear }">
            <div class="flex flex-col items-center justify-center">
              <UPageCard v-if="!loggedIn" orientation="vertical" title="S'identifier"
                description="Veuillez vous identifier grâce à l'ENT Hauts-de-France" @click="login"
                class="cursor-pointer" variant="subtle">
                <img src="https://cdn.enthdf.fr/assets/themes/hdf2d/img/illustrations/logo.png" />
              </UPageCard>
              <Can :ability="userOrDev">
                <div v-if="ownVoteStatus === 'success'">
                  <LangVote v-if="ownVote?.timestamp === null || ownVote?.toReset" :user="user" :ateliers="ateliers"
                    @choice-sent="ownVoteRefresh" />
                  <LangShow v-else :vote="ownVote!" @vote-again="ownVoteRefresh" />
                </div>
              </Can>
            </div>
          </template>
          <template #placeholder>
            Chargement...
          </template>
        </AuthState>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts" setup>
type LangueAvecAteliers = Langue & {
  atelier1: Atelier | null
  atelier2: Atelier | null
}

const intervalId = ref(0)

const tabs = ref([{
  label: 'Lundi',
  value: 1
}, {
  label: 'Mardi',
  value: 2
}, {
  label: 'Jeudi',
  value: 3
}, {
  label: 'Vendredi',
  value: 4
}])

const { data: ownVote, refresh: ownVoteRefresh, status: ownVoteStatus } = await useFetch<LangueAvecAteliers>('/api/langues/getOwnVote')

const { data: ateliers, refresh, status, clear } = await useLazyAsyncData('ateliers', () => $fetch('/api/langues/getAteliers'))

const { refresh: simuRefresh, status: simuStatus, execute: simuRun } = await useLazyAsyncData('simu', () => $fetch('/api/langues/simu'), { immediate: false })

function boardMount() {
  intervalId.value = setInterval(() => {
    refresh()
  }, 2000)
}

function boardUnmount() {
  clearInterval(intervalId.value)
  intervalId.value = 0
}

const login = async () => {
  const cookie = useCookie('redirection', {
    maxAge: 60,
    domain: '.nsi.rocks',
  })
  cookie.value = 'langues'

  await navigateTo('https://enthdf.fr/cas/login?service=https://nsi.rocks', { external: true })
}

</script>

<style scoped></style>
