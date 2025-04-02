<template>
  <UDashboardGroup>
    <UDashboardPanel
      id="langues-1"
      :max-size="80"
      :min-size="30"
      :default-size="100"
    >
      <template #header>
        <UDashboardNavbar title="Accueil">
          <template #right>
            <Can :ability="userOrDev">
              <UModal
                title="Un peu d'aide ?"
              >
                <UButton
                  label="Aide"
                  color="error"
                  variant="subtle"
                />

                <template #body>
                  <MDC :value="aideContent" />
                  <UInput
                    v-model="aide.eleve"
                    placeholder="Nom et prénom"
                    class="w-full"
                  />
                  <UTextarea
                    v-model="aide.message"
                    label="Message"
                    placeholder="J'ai rencontré un problème..."
                    class="mt-4 w-full"
                  />
                  <UButton
                    label="Envoyer"
                    color="primary"
                    class="mt-4"
                    @click="sendHelp"
                  />
                </template>
              </UModal>
            </Can>
            <Can :ability="adminOrDev">
              <UDrawer>
                <UButton
                  icon="i-lucide-kanban"
                  variant="soft"
                  rounded
                  class="mr-1 cursor-pointer"
                />

                <template #body>
                  <LangBoard
                    :tabs="tabs"
                    :ateliers="ateliers"
                    @dashboard-mount="boardMount"
                    @dashboard-unmount="boardUnmount"
                  />
                </template>
              </UDrawer>
              <UDrawer>
                <UButton
                  icon="i-lucide-gauge"
                  variant="soft"
                  rounded
                  class="mr-4 cursor-pointer"
                />

                <template #content>
                  <LangStats
                    :tabs="tabs"
                    :ateliers="ateliers"
                    @dashboard-mount="boardMount"
                    @dashboard-unmount="boardUnmount"
                  />
                </template>
              </UDrawer>
            </Can>
            <UColorModeSwitch />
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <UBanner
          id="ent-1"
          icon="i-lucide-info"
          :ui="{ container: 'min-h-12 h-auto', title: 'text-wrap' }"
          close
        >
          <template #title>
            <div>
              L'ENT est souvent en maintenance le mercredi après-midi. Si vous ne pouvez pas vous connecter, rééssayez régulièrement.
            </div>
          </template>
        </UBanner>
        <AuthState>
          <template #default="{ loggedIn, user, clear }">
            <div class="flex flex-col items-center justify-center">
              <Cannot :ability="userOrDev">
                <UPageCard
                  orientation="vertical"
                  title="S'identifier"
                  description="Veuillez vous identifier grâce à l'ENT Hauts-de-France en cliquant sur le logo ci-dessous."
                  class="cursor-pointer"
                  variant="subtle"
                  @click="login"
                >
                  <img
                    src="https://cdn.enthdf.fr/assets/themes/hdf2d/img/illustrations/logo.png"
                    class="m-auto"
                  >
                </UPageCard>
              </Cannot>
              <Can :ability="userNotSecond">
                <UPageCard
                  orientation="vertical"
                  title="Vous n'avez pas accès à cette page"
                  description="Les inscriptions à la semaine des langues sont réservées aux élèves de Seconde."
                  class="cursor-pointer"
                  variant="subtle"
                >
                  <Imago
                    :src="'capy-gros-plan.png'"
                    :nodark="true"
                  />
                </UPageCard>
              </Can>
              <Can :ability="allowLangues">
                <div
                  v-if="ownVoteStatus === 'success'"
                  class="w-full"
                >
                  <LangVote
                    v-if="ownVote?.timestamp === null || ownVote?.toReset"
                    :user="user"
                    :ateliers="ateliers"
                    @choice-sent="ownVoteRefresh"
                  />
                  <LangShow
                    v-else
                    :vote="ownVote!"
                    @vote-again="ownVoteRefresh"
                  />
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
// TODO : intégrer l'information d'une inscription en cours de modification
type LangueAvecAteliers = Langue & {
  atelier1: Atelier | null
  atelier2: Atelier | null
}

const toast = useToast()

const aideContent = `Si vous rencontrez un bug, si vous n'arrivez pas à vous identifier, ou si vous n'arrivez pas à obtenir ce que vous voulez, vous pouvez remplir le formulaire ci-dessous en précisant bien vos nom et prénom.`

const intervalId = ref(0)

const tabs = ref([{
  label: 'Lundi',
  value: 1,
}, {
  label: 'Mardi',
  value: 2,
}, {
  label: 'Jeudi',
  value: 3,
}, {
  label: 'Vendredi',
  value: 4,
}])

const aide = reactive({
  eleve: '',
  message: '',
})

const sendHelp = async () => {
  const { data, error } = await useFetch('/api/langues/help', {
    method: 'POST',
    body: {
      eleve: aide.eleve,
      message: aide.message,
    },
  })

  if (error.value) {
    toast.add({ title: 'Une erreur est survenue lors de l\'envoi du message.' })
  }
  else {
    toast.add({ title: 'Votre message a bien été envoyé.' })
  }
}

const { data: ownVote, refresh: ownVoteRefresh, status: ownVoteStatus } = await useFetch<LangueAvecAteliers>('/api/langues/getOwnVote')

const { data: ateliers, refresh, status, clear } = await useLazyAsyncData('ateliers', () => $fetch('/api/langues/getAteliers'))

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
