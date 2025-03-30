<template>
  <div class="w-full">
    <UAlert v-if="user" color="primary" variant="soft" title="Vous êtes bien connecté"
      :description="`Vous êtes connecté en tant que ${user?.firstName} ${user?.lastName} (${JSON.parse(user?.classes || `['']`)[0]})`"
      :actions="[{ label: 'se déconnecter', onClick: logout }]" />
    <UStepper :items="steps" v-model="stepChoix" disabled class="my-12" />
    <div v-if="stepChoix === 0 || stepChoix === 1">
      <UTabs v-if="stepChoix === 0" v-model="tabJours" :items="tabs" :content="false" />
      <UCard v-for="atelier in filterAteliers" :key="atelier.titre" class="mt-4">
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <ProseH3 class="my-0">{{ atelier.titre }}</ProseH3>
            <UButton @click="choixAtelier(stepChoix.valueOf(), atelier.id, tabJours.valueOf())" class="ml-auto">
              Choisir</UButton>
          </div>
        </template>
        <MDC :value="atelier.description || ''" />
      </UCard>
    </div>
    <div v-else>
      <UPageCard class="w-full">
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <div>
              <ProseH2 class="my-0">Vous avez fait vos choix !</ProseH2>
              <p>Il ne vous reste plus qu'à les relire, puis à confirmer votre sélection.</p>
            </div>
            <UButton @click="sendChoice" size="xl" class="block ml-auto">Confirmer</UButton>
          </div>
        </template>

        <template #footer>
          <UButton @click="sendChoice" size="xl" class="block ml-auto">Confirmer</UButton>
        </template>

        <template #body>
          <UCollapsible class="my-4">
            <UButton variant="soft" class="w-full">
              <div class="flex flex-row items-center justify-between w-full">
                <span>{{ateliers?.find(el => el.id === choix.a1choix)?.titre}}</span>
                <span>
                  <UIcon name="i-lucide-chevron-down" />
                </span>
              </div>
            </UButton>
            <template #content>
              <MDC :value="ateliers?.find(el => el.id === choix.a1choix)?.description || ''" />
            </template>
          </UCollapsible>
          <UCollapsible class="my-4">
            <UButton variant="soft" class="w-full">
              <div class="flex flex-row items-center justify-between w-full">
                <span>{{ateliers?.find(el => el.id === choix.a2choix)?.titre}}</span>
                <span>
                  <UIcon name="i-lucide-chevron-down" />
                </span>
              </div>
            </UButton>
            <template #content>
              <MDC :value="ateliers?.find(el => el.id === choix.a2choix)?.description || ''" />
            </template>
          </UCollapsible>
        </template>
      </UPageCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  user: any
  ateliers: Atelier[] | undefined
}>()

const emit = defineEmits<{
  (e: 'choiceSent'): void
}>()

const store = useStore()
const tabJours = ref(1)
const stepChoix = ref(0)
const toast = useToast()

const choix = reactive({
  a1jour: 0,
  a1choix: 0,
  a2choix: 0,
  toReset: false,
})

const steps = ref([{
  title: 'Premier atelier',
  description: 'Choisissez votre premier atelier',
}, {
  title: 'Deuxième atelier',
  description: 'Choisissez votre deuxième atelier',
}, {
  title: 'Confirmation',
  description: 'Confirmez votre choix',
}])

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


const choixAtelier = (step: number, idAtelier: number, jour: number) => {
  // console.log(`Choix de l'atelier ${idAtelier} pour le jour ${jour}`)
  if (step === 0) {
    choix.a1jour = jour
    choix.a1choix = idAtelier
  } else {
    choix.a2choix = idAtelier
  }
  stepChoix.value += 1
  toast.add({
    title: 'Atelier choisi',
    description: `Vous avez choisi l'atelier ${props.ateliers?.find(el => el.id === idAtelier)?.titre} du ${tabs.value.find(el => el.value === jour)?.label || 'jour choisi.'}`,
  })
}

const sendChoice = async () => {
  // console.log('Envoi des choix')
  // console.log(choix.valueOf())
  toast.add({
    title: 'Choix envoyés',
    description: 'Vos choix ont bien été envoyés, merci !',
  })
  const res = await $fetch.raw('/api/langues', {
    method: 'POST',
    body: choix.valueOf(),
  })
  if (res.status === 200) {
    emit('choiceSent')
  }
  // TODO : gérer la réussite de l'envoi des données, et rediriger vers une page de confirmation
  // TODO : ajouter aussi la récup des votes d'un élève dans le cas où il se reconnecte après avoir voté
}

const getABI = (id: number) => props.ateliers?.find(el => el.id === id)
const jourCompat = (id1: number, el: Atelier) => {
  const jours1 = getABI(id1)?.jours
  const jours2 = el.jours

  if (jours1?.length === 1 && jours2.length === 1) {
    return jours1[0] !== jours2[0]
  } else {
    return true
  }
}

const filterAteliers = computed(() => {
  if (stepChoix.value === 1) {
    return props.ateliers?.filter(el => el.id !== choix.a1choix)
      .filter(el => (getABI(choix.a1choix)?.isExcluding && !el.isExcluding) || !getABI(choix.a1choix)?.isExcluding)
      .filter(el => jourCompat(choix.a1choix, el))
  } else {
    return props.ateliers?.filter(el => el.jours.includes(tabJours.value))
  }
})


const logout = async () => {
  store.session.clear()
  await navigateTo('https://langues.nsi.rocks')
}
</script>

<style scoped></style>