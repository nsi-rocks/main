<template>
  <USlideover
    :close="{ onClick: () => emit('close', false) }"
    title="Affectation des élèves"
    description="Confirmation de l'affectation des élèves sur les différents ateliers"
    side="top"
  >
    <template #body>
      <div class="grid grid-cols-2">
        <div class="">
          <ul>
            <li class="grid grid-cols-[9rem_12rem_6rem_6rem] max-w-[40rem] mb-2 items-center">
              <strong class="col-span-2">{{ votes.filter(el => el.a1choix !== props.atelierId).length }} élèves à affecter</strong>
              <USelect
                v-model="classe"
                :items="classes"
                label="Classe"
                class="col-start-3"
              />
            </li>
            <li
              v-for="vote in sortedVotes.filter(el => el.a1choix !== props.atelierId)"
              :key="vote.id"
              class="grid grid-cols-[9rem_12rem_6rem_6rem] max-w-[40rem]"
            >
              <span class="">{{ vote.firstName }}</span>
              <span class="truncate">{{ vote.lastName }}</span>
              <span class="">{{ JSON.parse(vote.classes!)[0] }}</span>
              <UButton
                :label="getLabel(vote)"
                variant="outline"
                class="justify-self-start"
                trailing-icon="i-lucide-arrow-right"
                @click="confirmVote(vote, {
                  assignJ1atelier: props.atelierId,
                  assignJ1jour: jourActuel!,
                  assignJ2atelier: props.atelierId,
                  assignJ2jour: jourActuel!,
                })"
              />
            </li>
          </ul>
        </div>
        <div>
          <UPageCard :title="`${atelier?.titre} - ${atelier?.max} places`">
            <UTabs
              v-model="jourActuel"
              :content="false"
              :items="jours"
              :ui="{ trigger: 'cursor-pointer' }"
            />
            <ul>
              <li
                v-for="(vote, idx) in sortedVotes.filter(el => el.a1jour === jourActuel)"
                :key="vote.id"
                class="grid grid-cols-[2rem_9rem_12rem_6rem] max-w-[40rem]"
              >
                <span class="">{{ idx+1 }}</span>
                <span class="">{{ vote.firstName }}</span>
                <span class="truncate">{{ vote.lastName }}</span>
                <span class="">{{ JSON.parse(vote.classes!)[0] }}</span>
              </li>
            </ul>
          </UPageCard>
          {{ atelier }}
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          label="Dismiss"
          @click="emit('close', false)"
        />
        <UButton
          label="Success"
          @click="emit('close', true)"
        />
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
const props = defineProps<{
  atelierId: number
  atelier: AtelierAvecNbChoix | undefined
  votes: MergedRow[]
}>()

const emit = defineEmits<{ close: [boolean] }>()

const classe = ref('Toutes')
const joursRef = ['Choix2', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi']
const jours = computed(() => {
  return ['Lundi', 'Mardi', 'Jeudi', 'Vendredi'].map((j, idx) => {
    return {
      id: idx + 1,
      label: j,
      disabled: !props.atelier?.jours.includes(idx + 1),
      icon: props.atelier?.jours.includes(idx + 1) ? '' : 'i-lucide-ban',
      value: idx + 1,
    }
  })
})

const jourActuel = ref(props.atelier?.jours[0])

const getLabel = (vote: MergedRow) => {
  const jour = joursRef[vote.a1choix === props.atelierId ? vote.a1jour : 0]
  const action = (vote.a1choix === props.atelierId && vote.a1jour === jourActuel.value) ? 'déjà affecté' : `affecter à ${jours.value.find(j => j.id === jourActuel.value)?.label}`
  return `${action}`
}


const confirmVote = async (vote: MergedRow, affectation: Partial<Affectation>) => {
  if (vote.a1choix === props.atelierId) {
    // le premier choix est le choix de l'atelier, on confirme a priori sur le jour choisi mais en tous cas on est sur le choix 1
    await $fetch('/api/langues/assign', {
      method: 'PATCH',
      body: {
        userId: vote.userId,
        assignJ1atelier: affectation.assignJ1atelier,
        assignJ1jour: affectation.assignJ1jour,
      },
    })
    return
  }
  await $fetch('/api/langues/assign', {
    method: 'PATCH',
    body: {
      userId: vote.userId,
      assignJ2atelier: affectation.assignJ2atelier,
      assignJ2jour: affectation.assignJ2jour,
    },
  })
  return
}

const sortedVotes = computed(() => {
  return [...props.votes].filter((el) => {
    if (classe.value === 'Toutes') return true
    return JSON.parse(el.classes)[0] === classe.value
  }).sort((a, b) => {
    const tsA = a.lastName
    const tsB = b.lastName
    return tsA.localeCompare(tsB) // décroissant : les plus récents d'abord
  }).sort((a, b) => {
    const tsA = JSON.parse(a.classes ?? '')[0].split(' ')[1]
    const tsB = JSON.parse(b.classes ?? '')[0].split(' ')[1]
    return tsA - tsB // décroissant : les plus récents d'abord
  })
})

const classes = computed(() => {
  const allClasses = props.votes.flatMap((entry) => {
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
</script>
