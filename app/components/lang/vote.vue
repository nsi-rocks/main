<template>
  <div class="w-full">
    <UAlert
      v-if="user"
      color="primary"
      variant="soft"
      title="Vous êtes bien connecté"
      :description="`Vous êtes connecté en tant que ${user?.firstName} ${user?.lastName} (${JSON.parse(user?.classes || `['']`)[0]})`"
      :actions="[{ label: 'se déconnecter', onClick: logout }]"
    />
    <UStepper
      v-model="stepChoix"
      :items="steps"
      disabled
      class="my-12"
    />
    <div v-if="stepChoix === 0 || stepChoix === 1">
      <UTabs
        v-if="stepChoix === 0"
        v-model="tabJours"
        :items="tabs"
        :content="false"
      />
      <ClientOnly>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <LazyUCard
            v-for="atelier in filterAteliers"
            :key="atelier.id"
            class="mt-4"
            variant="subtle"
            :class="[7, 28].includes(atelier.id) ? 'row-span-2' : ''"
          >
            <template #header>
              <div class="flex flex-row items-center justify-between">
                <ProseH3 class="my-0">
                  {{ atelier.titre }}
                </ProseH3>
                <UButton
                  class="ml-auto cursor-pointer"
                  @click="choixAtelier(stepChoix.valueOf(), atelier.id, tabJours.valueOf())"
                >
                  Choisir
                </UButton>
              </div>
            </template>
            <MDC :value="atelier.description || ''" />
          </LazyUCard>
        </div>
      </ClientOnly>
    </div>
    <div v-else>
      <UPageCard
        class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 m-auto"
        variant="subtle"
      >
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <div>
              <ProseH2 class="my-0">
                Vous avez fait vos choix !
              </ProseH2>
              <p>Il ne vous reste plus qu'à les relire, puis à confirmer votre sélection.</p>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex flex-row items-center justify-around">
            <UButton
              color="neutral"
              variant="outline"
              size="xl"
              class="cursor-pointer"
              @click="stepChoix = 0"
            >
              Modifier
              mes choix
            </UButton>
            <UButton
              size="xl"
              class="cursor-pointer"
              @click="sendChoice"
            >
              Confirmer
            </UButton>
          </div>
        </template>

        <template #body>
          <UCollapsible class="my-4">
            <UButton
              variant="soft"
              class="w-full cursor-pointer"
            >
              <div class="flex flex-row items-center justify-between w-full">
                <span>{{ ateliers?.find(el => el.id === choix.a1choix)?.titre }}</span>
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
            <UButton
              variant="soft"
              class="w-full cursor-pointer"
            >
              <div class="flex flex-row items-center justify-between w-full">
                <span>{{ ateliers?.find(el => el.id === choix.a2choix)?.titre }}</span>
                <span>
                  <UIcon name="i-lucide-chevron-down" />
                </span>
              </div>
            </UButton>
            <template #content>
              <MDC :value="ateliers?.find(el => el.id === choix.a2choix)?.description || ''" />
            </template>
          </UCollapsible>
          <UTextarea
            v-model="choix.commentaire"
            label="Remarques"
            placeholder="Remarque éventuelle : rdv médical (date/heure/professionnel)."
            class="mt-4 w-full"
          />
        </template>
      </UPageCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface AtelierAvecNbChoix extends Atelier {
  nbChoix: [number, number, number, number, number] // [a2, jour1, jour2, jour3, jour4]
}

const props = defineProps<{
  user: any
  ateliers: AtelierAvecNbChoix[] | undefined
}>()

const emit = defineEmits<(e: 'choiceSent') => void>()

const store = useStore()
const tabJours = ref(1)
const stepChoix = ref(0)
const toast = useToast()

const choix = reactive({
  a1jour: 0,
  a1choix: 0,
  a2choix: 0,
  toReset: false,
  commentaire: '',
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

const choixAtelier = (step: number, idAtelier: number, jour: number) => {
  // console.log(`Choix de l'atelier ${idAtelier} pour le jour ${jour}`)
  if (step === 0) {
    choix.a1jour = jour
    choix.a1choix = idAtelier
  }
  else {
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

  try {
    const res = await $fetch.raw('/api/langues', {
      method: 'POST',
      body: choix.valueOf(),
      // body: {
      //   a1jour: 3,
      //   a1choix: 2,
      //   a2choix: 3,
      //   toReset: false,
      // },
    })
    toast.add({
      title: 'Choix envoyés',
      description: 'Vos choix ont bien été envoyés, merci !',
      color: 'success',
      icon: 'i-lucide-check',
    })
    emit('choiceSent')
  }
  catch (err) {
    if (err.status === 400)
      toast.add({
        title: 'Erreur',
        description: 'Les ateliers choisis sont complets, veuillez procéder à nouveau à votre sélection.',
        color: 'error',
        icon: 'i-lucide-x',
      })
  }
}

const getABI = (id: number) => props.ateliers?.find(el => el.id === id)
const jourCompat = (id1: number, el: Atelier) => {
  const jours1 = getABI(id1)?.jours
  const jours2 = el.jours

  if (jours1?.length === 1 && jours2.length === 1) {
    return jours1[0] !== jours2[0]
  }
  else {
    return true
  }
}

function shuffle<T>(array?: T[] | null): T[] {
  if (!array) return []
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]!
    copy[i] = copy[j]!
    copy[j] = temp
  }
  return copy
}

const filterAteliers = computed(() => {
  if (stepChoix.value === 1) {
    return shuffle(props.ateliers?.filter(el => el.id !== choix.a1choix)
      .filter(el => !getABI(choix.a1choix)?.isExcluding || !el.isExcluding)
      .filter(el => !getABI(choix.a1choix)?.isCine || !el.isCine)
      .filter(el => jourCompat(choix.a1choix, el))
      .filter((el) => {
        const totalChoix = el.nbChoix.reduce((a, b) => a + b, 0)
        const totalPlaces = el.jours.length * el.max
        const remainingPlaces = totalPlaces - totalChoix

        const jourCounts = el.jours.reduce((acc, jour) => {
          if (jour >= 1 && jour <= 4) {
            acc[jour] = (acc[jour] || 0) + 1
          }
          return acc
        }, {} as Record<number, number>)

        const isDispoSurUnJour = Object.entries(jourCounts).some(([jourStr, count]) => {
          const jour = Number(jourStr)
          return el.nbChoix[jour]! < el.max * count
        })

        // atelier à afficher uniquement s’il reste des places globales
        // ET s’il reste au moins un jour avec place
        return remainingPlaces > 0 && isDispoSurUnJour
      }))
  }
  else {
    return shuffle(props.ateliers?.filter(el => el.jours.includes(tabJours.value))
      .filter((el) => {
        const jour = tabJours.value
        const sessions = el.jours.filter(j => j === jour).length
        return el.nbChoix[jour]! < el.max * sessions
      }))
  }
})

const logout = async () => {
  store.session.clear()
  await navigateTo('https://langues.nsi.rocks')
}
</script>

<style scoped></style>
