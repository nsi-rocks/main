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
            <li>
              <UCheckbox
                v-model="noninscrits"
                label="Afficher les non inscrits"
              />
            </li>
            <li class="grid grid-cols-[9rem_12rem_6rem_9rem] max-w-[40rem] mb-2 items-center">
              <strong class="col-span-2">{{ votesByClass.length }} élèves à affecter</strong>
              <USelect
                v-model="classe"
                :items="classes"
                label="Classe"
                class="col-start-3"
              />
              <UButton
                v-if="!noninscrits"
                trailing-icon="i-lucide-arrow-right"
                label="Affecter tous"
                variant="outline"
                class="justify-self-center"
                @click="assignBulkVotes(votesByClass)"
              />
            </li>
            <li
              v-for="vote in votesByClass"
              :key="vote.id"
              class="grid grid-cols-[9rem_12rem_6rem_1fr] max-w-[40rem]"
            >
              <span class="">{{ vote.firstName }}</span>
              <span class="truncate">{{ vote.lastName }}</span>
              <span>{{ (() => {
                try { return JSON.parse(vote.classes || '[""]')[0] }
                catch (e) { return '' }
              })() }}</span>

              <UButton
                v-if="vote.a1choix !== 33 || vote.a2choix !== 33"
                :label="getLabel(vote)"
                variant="ghost"
                class="justify-self-start"
                trailing-icon="i-lucide-arrow-right"
                @click="confirmVote(vote)"
              />
              <div
                v-else
                class="grid grid-cols-2 gap-2"
              >
                <UButton
                  v-if="vote.assignJ1jour == null && vote.assignJ2jour !== jourActuel"
                  label="Affecter J1"
                  variant="ghost"
                  class="justify-self-start"
                  trailing-icon="i-lucide-arrow-right"
                  @click="confirmVote(vote, 1)"
                />
                <UButton
                  v-if="vote.assignJ2jour == null && vote.assignJ1jour !== jourActuel"
                  label="Affecter J2"
                  variant="ghost"
                  class="justify-self-start col-start-2"
                  trailing-icon="i-lucide-arrow-right"
                  @click="confirmVote(vote, 2)"
                />
              </div>
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
                <span
                  v-if="modifs.map(el => el.userId).includes(vote.userId)"
                  class="flex flex-row items-center gap-4"
                >

                  <UButton
                    v-if="modifs.map(el => el.userId).includes(vote.userId)"
                    icon="i-lucide-x"
                    variant="ghost"
                    size="xs"
                    class="justify-self-start p-0"
                    @click="cancelVote(vote)"
                  />

                  <UBadge
                    :label="modifs.find(el => el.userId === vote.userId)?.assignJ1jour !== undefined ? 'jour 1' : 'jour 2'"

                    variant="soft"
                  />

                </span>
                <UButton
                  v-else
                  icon="i-lucide-x"
                  variant="ghost"
                  size="xs"
                  class="justify-self-start p-0"
                  label="Supprimer l'affectation"
                  @click="suppAffectation(vote)"
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
import { LazyLangConfirmSupp } from '#components'

const props = defineProps<{
  atelierId: number
  atelier: AtelierAvecNbChoix | undefined
}>()

const { data: votes } = useNuxtData('votes')
const toast = useToast()
const overlay = useOverlay()
const classe = ref('Toutes')
const noninscrits = ref(false)
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
    const modif: any = { userId: vote.userId }

    if (vote.assignJ1atelier === props.atelierId) {
      vote.assignJ1jour = jourActuel.value!
      modif.assignJ1jour = jourActuel.value!
      if (vote.assignJ1atelier !== props.atelierId) {
        vote.assignJ1atelier = props.atelierId
        modif.assignJ1atelier = props.atelierId
      }
      else {
        modif.shJ1atelier = props.atelierId
      }
    }
    else {
      vote.assignJ2jour = jourActuel.value!
      modif.assignJ2jour = jourActuel.value!
      if (vote.assignJ2atelier !== props.atelierId) {
        vote.assignJ2atelier = props.atelierId
        modif.assignJ2atelier = props.atelierId
      }
      else {
        modif.shJ2atelier = props.atelierId
      }
    }

    modifs.value.push(modif)
  })

  votes.value = [...votes.value]
}

const confirmVote = async (vote: MergedRow, jour?: number) => {
  if (!jour || jour === 2) {
    const modif: any = {
      userId: vote.userId,
    }
    if (votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2atelier !== props.atelierId) {
      // console.log('assignJ2atelier', votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2atelier, props.atelierId)

      votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2atelier = props.atelierId

      // console.log('assignJ2atelier', votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2atelier, props.atelierId)

      modif.assignJ2atelier = props.atelierId
    }
    else modif.shJ2atelier = props.atelierId
    votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ2jour = jourActuel.value!
    modif.assignJ2jour = jourActuel.value!
    votes.value = [...votes.value]
    modifs.value.push(modif)
  }
  else {
    const modif: any = {
      userId: vote.userId,
    }
    if (votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ1atelier !== props.atelierId) {
      votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ1atelier = props.atelierId
      modif.assignJ1atelier = props.atelierId
    }
    else modif.shJ1atelier = props.atelierId
    votes.value.find((el: MergedRow) => el.userId === vote.userId).assignJ1jour = jourActuel.value!
    modif.assignJ1jour = jourActuel.value!
    votes.value = [...votes.value]
    modifs.value.push(modif)
  }
  return
}

const cancelVote = async (vote: MergedRow) => {
  if (modifs.value.map(el => el.userId).includes(vote.userId)) {
    const { userId, ...keys } = modifs.value.find((el: updateData) => el.userId === vote.userId)
    Object.keys(keys).forEach((key) => {
      if (key !== 'shJ1atelier' && key !== 'shJ2atelier') {
        votes.value.find((el: MergedRow) => el.userId === vote.userId)[key] = null
      }
    })
    modifs.value = modifs.value.filter((el: updateData) => el.userId !== vote.userId)
    await refreshNuxtData('votes')
    votes.value = [...votes.value]
    toast.add({ title: `Vote de ${vote.firstName} ${vote.lastName} annulé` })
  }
}

const suppAffectation = async (vote: any) => {
  const data = {
    vote: vote,
    atelierId: props.atelierId,
  }
  const modal = overlay.create(LazyLangConfirmSupp, {
    props: {
      data: data,
    },
  })

  const confirm = await modal.open()
  if (confirm === true) {
    try {
      const data = await $fetch.raw('/api/langues/deleteVote', {
        method: 'PATCH',
        body: {
          userId: vote.userId,
          atelierId: props.atelierId,
        },
      })

      if (data.status === 200) {
        toast.add({ title: 'Affectation supprimée avec succès', color: 'success' })
        refreshNuxtData('votes')
      }
      else {
        toast.add({ title: 'Une erreur est survenue lors de la suppression', color: 'error' })
      }
    }
    catch (error) {
      console.error('Error while deleting vote:', error)
      toast.add({ title: 'Une erreur est survenue, il y a un bug à résoudre !', color: 'error' })
    }
  }
}

const saveModifs = async () => {
  try {
    const body = modifs.value.map(el => ({
      assignJ1atelier: (el.assignJ1atelier !== undefined && el.assignJ1atelier !== null) ? el.assignJ1atelier : el.shJ1atelier,
      assignJ2atelier: (el.assignJ2atelier !== undefined && el.assignJ2atelier !== null) ? el.assignJ2atelier : el.shJ2atelier,
      assignJ1jour: el.assignJ1jour,
      assignJ2jour: el.assignJ2jour,
      userId: el.userId,
    }))
    console.log('body', body)

    const res = await $fetch.raw('/api/langues/updateVotes', {
      method: 'PATCH',
      body,
    })

    modifs.value = []
    toast.add({ title: 'Modifications enregistrées' })
    await refreshNuxtData('votes')
  }
  catch (error) {
    console.error('Error while saving modifications:', error)
    toast.add({ title: 'Une erreur est survenue, il y a un bug à résoudre !' })
    refreshNuxtData('votes')
  }
}

const votesByClass = computed(() => {
  return votes.value
    .slice()
    .filter((el) => {
      return (
        (el.assignJ2atelier === props.atelierId && el.assignJ2jour === null)
        || ((el.assignJ1atelier === 33 || el.assignJ2atelier === 33) && noninscrits.value)
      )
      && !(
        (el.assignJ1atelier === props.atelierId && el.assignJ1jour !== null)
        || (el.assignJ2atelier === props.atelierId && el.assignJ2jour !== null)
      )
      && (el.assignJ1jour !== jourActuel.value && el.assignJ2jour !== jourActuel.value)
    })
    .filter((el) => {
      if (classe.value === 'Toutes') return true
      try {
        return JSON.parse(el.classes)[0] === classe.value
      }
      catch (e) {
        return false
      }
    })
    .sort((a, b) => {
      let classA = '', classB = ''
      try {
        classA = JSON.parse(a.classes || '[""]')[0].split(' ')[1] || ''
        classB = JSON.parse(b.classes || '[""]')[0].split(' ')[1] || ''
      }
      catch (e) {}

      // Comparaison par classe (numérique si possible)
      const numA = parseInt(classA, 10)
      const numB = parseInt(classB, 10)
      const classDiff = !isNaN(numA) && !isNaN(numB)
        ? numA - numB
        : classA.localeCompare(classB)

      if (classDiff !== 0) return classDiff

      // Si les classes sont égales, on trie par nom
      return a.lastName.localeCompare(b.lastName)
    })
})

const assignedVotes = computed(() => {
  return votes.value
    .slice()
    .filter(el =>
      (el.assignJ1atelier === props.atelierId && el.assignJ1jour === jourActuel.value)
      || (el.assignJ2atelier === props.atelierId && el.assignJ2jour === jourActuel.value),
    )
    .sort((a, b) => {
      const tsA = a.lastName
      const tsB = b.lastName
      return tsA.localeCompare(tsB)
    })
    .sort((a, b) => {
      let tsA = '', tsB = ''
      try {
        tsA = JSON.parse(a.classes || '[""]')[0].split(' ')[1]
        tsB = JSON.parse(b.classes || '[""]')[0].split(' ')[1]
      }
      catch (e) {}
      return tsA - tsB
    })
})

const classes = computed(() => {
  const allClasses = votes.value
    .map((entry) => {
      try {
        return JSON.parse(entry.classes) // ["2NDE 08"]
      }
      catch (e) {
        return [] // en cas d'erreur
      }
    })
    .reduce((acc, val) => acc.concat(val), []) // concatène tous les tableaux

  const uniqueClasses = [...new Set(allClasses)]
  return ['Toutes', ...uniqueClasses.sort((a, b) => a.localeCompare(b))]
})
</script>
