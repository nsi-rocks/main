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
            <UserButton redirect-app="lang" />
          </template>
        </UDashboardNavbar>
        <Can :ability="adminOrDev">
          <UDashboardToolbar>
            <template #left>
              <UButton
                icon="i-lucide-table"
                label="Visualisation des votes"
                variant="link"
                rounded
                class="mr-1 cursor-pointer"
                :color="adminPanel === 0 ? 'primary' : 'neutral'"
                @click="adminPanel = 0"
              />
              <UButton
                icon="i-lucide-layout-grid"
                label="Ateliers"
                variant="link"
                rounded
                class="mr-1 cursor-pointer"
                :color="adminPanel === 1 ? 'primary' : 'neutral'"
                @click="adminPanel = 1"
              />
              <UButton
                icon="i-lucide-bar-chart-2"
                label="Modifications"
                variant="link"
                rounded
                class="mr-4 cursor-pointer"
                :color="adminPanel === 2 ? 'primary' : 'neutral'"
                @click="adminPanel = 2"
              />
            </template>
            <template #right>
              <USelect
                v-if="adminPanel === 0 || adminPanel === 2"
                v-model="classe"
                :items="classes"
                label="Classe"
              />
            </template>
          </UDashboardToolbar>
        </Can>
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
              Les inscriptions pour la semaine des langues sont terminées.
            </div>
          </template>
        </UBanner>
        <AuthState>
          <template #default="{ loggedIn, user, clear }">
            <UPageCard
              v-if="false"
              title="Les inscriptions sont terminées"
              description="Les inscriptions à la semaine des langues sont terminées pour cette année, vous recevrez bientôt des informations relatives à vos voeux."
            />
            <Can :ability="adminOrDev">
              <LangAdmin
                v-if="votes && ateliers"
                :panel="adminPanel"
                :votes="votes"
                :ateliers="ateliers"
                :classe="classe"
              />
            </Can>
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
const toast = useToast()


const aideContent = `Si vous rencontrez un bug, si vous n'arrivez pas à vous identifier, ou si vous n'arrivez pas à obtenir ce que vous voulez, vous pouvez remplir le formulaire ci-dessous en précisant bien vos nom et prénom.`

const adminPanel = ref(0)
const classe = ref<string>('Toutes')

const { data: ownVote, refresh: ownVoteRefresh, status: ownVoteStatus } = await useFetch<LangueAvecAteliers>('/api/langues/getOwnVote')

const { data: ateliers, refresh, status, clear } = await useLazyAsyncData('ateliers', () => $fetch('/api/langues/getAteliers'))

const { data: votes, refresh: votesRefresh, status: votesStatus } = await useLazyAsyncData('votes', () => $fetch('/api/langues/getVotes'))

const classes = computed(() => {
  const allClasses = votes.value?.flatMap((entry) => {
    try {
      return JSON.parse(entry.classes) // convertit "[\"2NDE 08\"]" → ["2NDE 08"]
    }
    catch (e) {
      return [] // en cas d'erreur de parsing
    }
  })

  const uniqueClasses = [...new Set(allClasses)]
  return ['Toutes', ...uniqueClasses.sort((a, b) => a.localeCompare(b))]
})

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

function boardMount() {
  // intervalId.value = setInterval(() => {
  //   refresh()
  // }, 2000)
  return
}

function boardUnmount() {
  // clearInterval(intervalId.value)
  // intervalId.value = 0
  return
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
