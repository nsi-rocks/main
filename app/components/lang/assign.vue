<template>
  <USlideover
    title="Affectation des élèves"
    description="Confirmation de l'affectation des élèves sur les différents ateliers"
    side="top"
  >
    <template #body>
      <div class="grid grid-cols-2">
        <div class="">
          <ul>
            <li class="grid grid-cols-[9rem_12rem_6rem_9rem] max-w-[40rem] mb-2 items-center">
              <strong class="col-span-2">{{ votesByClass.filter(el => el.assignJ1atelier !== props.atelierId && el.assignJ2jour === null).length }} élèves à affecter</strong>
              <USelect
                v-model="classe"
                :items="classes"
                label="Classe"
                class="col-start-3"
              />
              <UButton
                trailing-icon="i-lucide-arrow-right"
                label="Affecter tous"
                variant="outline"
                class="justify-self-center"
                @click="assignBulkVotes(votesByClass.filter(el => el.assignJ1atelier !== props.atelierId && el.assignJ2jour === null))"
              />
            </li>
            <li
              v-for="vote in votesByClass.filter(el => el.assignJ1atelier !== props.atelierId && el.assignJ2jour === null)"
              :key="vote.id"
              class="grid grid-cols-[9rem_12rem_6rem_6rem] max-w-[40rem]"
            >
              <span class="">{{ vote.firstName }}</span>
              <span class="truncate">{{ vote.lastName }}</span>
              <span class="">{{ JSON.parse(vote.classes!)[0] }}</span>
              <UButton
                :label="getLabel(vote)"
                variant="ghost"
                class="justify-self-start"
                trailing-icon="i-lucide-arrow-right"
                @click="confirmVote(vote)"
              />
            </li>
          </ul>
        </div>
        <div>
          <UPageCard>
            <template #header>
              <div class="flex flex-row justify-between items-center">
                <span class="font-semibold flex flex-row items-center gap-4">
                  <span>{{ `${atelier?.titre} - ${atelier?.max! * (atelier?.jours.filter(el => el === jourActuel).length || 1)} places` }}</span>
                  <UTooltip
                    v-if="assignedVotes.length > atelier?.max! * (atelier?.jours.filter(el => el === jourActuel).length || 1)"
                    :delay-duration="0"
                    text="Le nombre d'élèves affectés à cet atelier est supérieur au max. (non bloquant, tu peux quand même affecter des élèves)"
                  >
                    <UIcon
                      name="i-lucide-triangle-alert"
                      class="text-yellow-600"
                    />
                  </UTooltip>
                </span>
                <UButton
                  v-if="modifs.length > 0"
                  :label="`Enregistrer les ${modifs.length} modifications`"
                  @click="saveModifs"
                />
              </div>
            </template>
            <UTabs
              v-model="jourActuel"
              :content="false"
              :items="jours"
              :ui="{ trigger: 'cursor-pointer' }"
            />
            <ul>
              <li
                v-for="(vote, idx) in assignedVotes"
                :key="vote.id"
                class="grid grid-cols-[2rem_9rem_12rem_6rem_2rem] max-w-[40rem]"
              >
                <span class="">{{ idx+1 }}</span>
                <span class="">{{ vote.firstName }}</span>
                <span class="truncate">{{ vote.lastName }}</span>
                <span class="">{{ JSON.parse(vote.classes!)[0] }}</span>
                <UButton
                  v-if="vote.assignJ2jour === jourActuel"
                  icon="i-lucide-x"
                  variant="ghost"
                  size="xs"
                  class="justify-self-start"
                  @click="cancelVote(vote)"
                />
              </li>
            </ul>
          </UPageCard>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import type { Affectation, MergedRow } from '~~/shared/types/langues'

const props = defineProps<{
  atelierId: number
  atelier: AtelierAvecNbChoix | undefined
}>()

const { data: votes } = useNuxtData('votes')
const toast = useToast()
const classe = ref('Toutes')
const modifs = useState<updateData[]>('modifs', () => [])
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
  const jour = joursRef[vote.assignJ1atelier === props.atelierId ? vote.assignJ1jour : 0]
  const action = (vote.assignJ1atelier === props.atelierId && vote.assignJ1jour === jourActuel.value) ? 'déjà affecté' : `affecter à ${jours.value.find(j => j.id === jourActuel.value)?.label}`
  return `${action}`
}

const assignBulkVotes = async (toAssign: MergedRow[]) => {
  [...toAssign].forEach((vote: MergedRow) => {
    if (vote.assignJ1atelier === props.atelierId) {
      vote.assignJ1atelier = props.atelierId
      vote.assignJ1jour = jourActuel.value!
      modifs.value.push({
        userId: vote.userId,
        assignJ1atelier: props.atelierId,
        assignJ1jour: jourActuel.value,
      })
    }
    else {
      vote.assignJ2atelier = props.atelierId
      vote.assignJ2jour = jourActuel.value!
      modifs.value.push({
        userId: vote.userId,
        assignJ2atelier: props.atelierId,
        assignJ2jour: jourActuel.value,
      })
    }
  })
  votes.value = [...votes.value]
}
const confirmVote = async (vote: MergedRow) => {
  votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2atelier = props.atelierId
  votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2jour = jourActuel.value!
  votes.value = [...votes.value]

  modifs.value.push({
    userId: vote.userId,
    assignJ2atelier: props.atelierId,
    assignJ2jour: jourActuel.value,
  })
  return
}

const cancelVote = (vote: MergedRow) => {
  if (vote.assignJ2jour === jourActuel.value) {
    votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2jour = null
    votes.value = [...votes.value]

    modifs.value = modifs.value.filter((el: updateData) => el.userId !== vote.userId)
  }
}

const saveModifs = async () => {
  try {
    const res = await $fetch.raw('/api/langues/updateVotes', {
      method: 'PATCH',
      body: modifs.value,
    })
    modifs.value = []
    toast.add({ title: 'Modifications enregistrées' })
    await refreshNuxtData('votes')
  }
  catch (error) {
    console.error('Error while saving modifications:', error)
    refreshNuxtData('votes')
  }
}

const votesByClass = computed(() => {
  return [...votes.value].filter(el => el.assignJ1atelier === props.atelierId || el.assignJ2atelier === props.atelierId).filter((el) => {
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

const assignedVotes = computed(() => {
  return [...votes.value].filter(el => (el.assignJ1atelier === props.atelierId && el.assignJ1jour === jourActuel.value) || (el.assignJ2atelier === props.atelierId && el.assignJ2jour === jourActuel.value)).sort((a, b) => {
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
  const allClasses = votes.value.flatMap((entry) => {
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
