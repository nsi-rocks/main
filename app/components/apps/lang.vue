<template>
  <UDashboardGroup>
    <UDashboardPanel
      resizable
      :max-size="80"
      :min-size="30"
      :default-size="50"
    >
      <template #header>
        <UDashboardNavbar title="test">
          <template #right>
            <UColorModeSwitch />
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <UPageCard
          title="S'identifier"
          class="self-center"
        >
          <UFormField>
            <UInput
              v-model="eleve.nom"
              label="Nom"
            />
          </UFormField>
          <UFormField>
            <UInput
              v-model="eleve.prenom"
              label="Prénom"
            />
          </UFormField>
          <UFormField>
            <USelect
              v-model="eleve.classe"
              :items="classes"
              label="Classe"
            />
          </UFormField>
        </UPageCard>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts" setup>
const classes = ref(['2nde01', '2nde02', '2nde03', '2nde04', '2nde05', '2nde06', '2nde07', '2nde08', '2nde09', '2nde10', '2nde11'])
const eleve = reactive({
  nom: 'Doe',
  prenom: 'John',
  classe: '2nde01',
})
</script>

<style scoped>

</style>
