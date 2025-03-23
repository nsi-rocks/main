<template>
  <UDashboardGroup>
    <UDashboardPanel resizable :max-size="80" :min-size="30" :default-size="50">
      <template #header>
        <UDashboardNavbar title="Accueil">
          <template #right>
            <UColorModeSwitch />
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <AuthState>
          <template #default="{ loggedIn, user, clear }">
            <div class="flex items-center justify-center">
              <UPageCard v-if="!loggedIn" orientation="vertical" title="S'identifier"
                description="Veuillez vous identifier grâce à l'ENT Hauts-de-France" @click="login"
                class="cursor-pointer">
                <img src="https://cdn.enthdf.fr/assets/themes/hdf2d/img/illustrations/logo.png" />
              </UPageCard>
              <UAlert v-else color="primary" variant="soft" title="Vous êtes bien connecté"
                :description="`Vous êtes connecté en tant que ${user?.firstName} ${user?.lastName} (${JSON.parse(user?.classes || `['']`)[0]})`"
                :actions="[{ label: 'se déconnecter', onClick: logout }]" />
            </div>
          </template>
          <template #placeholder>
            Chargement...
          </template>
        </AuthState>
      </template>
    </UDashboardPanel>
    <UDashboardPanel resizable :max-size="80" :min-size="30" :default-size="50">
      <template #header>
        <UDashboardNavbar title="Détails sur l'atelier">
        </UDashboardNavbar>
      </template>
      <template #body>
        <UPageCard title="S'identifier" class="self-center">
          <UFormField>
            <UInput v-model="eleve.nom" label="Nom" />
          </UFormField>
          <UFormField>
            <UInput v-model="eleve.prenom" label="Prénom" />
          </UFormField>
          <UFormField>
            <USelect v-model="eleve.classe" :items="classes" label="Classe" />
          </UFormField>
        </UPageCard>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts" setup>
const store = useStore()
const classes = ref(['2nde01', '2nde02', '2nde03', '2nde04', '2nde05', '2nde06', '2nde07', '2nde08', '2nde09', '2nde10', '2nde11'])
const eleve = reactive({
  nom: 'Doe',
  prenom: 'John',
  classe: '2nde01',
})

const ateliers = [{
  title: "Escape Game",
  max: 24,
  description: "Description de l'atelier",
  jours: [1, 2, 3, 4]
}]

const login = async () => {
  const cookie = useCookie('redirection', {
    maxAge: 60,
    domain: '.nsi.rocks',
  })
  cookie.value = 'langues'

  await navigateTo('https://enthdf.fr/cas/login?service=https://nsi.rocks', { external: true })
}

const logout = async () => {
  store.session.clear()
  await navigateTo('https://langues.nsi.rocks')
}
</script>

<style scoped></style>
