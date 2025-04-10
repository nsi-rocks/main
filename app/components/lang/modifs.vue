<template>
  <div>
    <ProseP>Tu peux voir ici les modifications appliquées dans les différents ateliers dans une première partie (qui n'est pas affichée si tu n'as fait aucune modification). Dans le grand tableau, tu vois l'état des lieux par classe, tu peux filtrer en haut à droite pour n'afficher qu'une classe au lieu de tout le monde.</ProseP>
    <ProseP>Tu n'est pas obligée d'enregistrer à chaque fois que tu fais quelque chose, mais si tu actualises la page ou que tu la fermes <strong>tu perdras les modifications qui ne sont pas encore enregistrées</strong>. Tu peux donc te balader d'atelier en atelier pour assigner les places aux élèves, revenir ici pour voir l'ensemble, et valider depuis cette page. Tu peux aussi valider depuis la page individuelle des ateliers.</ProseP>
    <div v-if="modifs.length > 0">
      <div class="flex flex-row justify-between items-center">
        <ProseH2 class="text-2xl">
          Modifications n'ayant pas encore été enregistrées
        </ProseH2>
        <UButton
          label="Valider les modifications"
          @click="saveModifs"
        />
      </div>
      <UTable
        :data="bmodifs"
        :columns="columns"
      />
    </div>
    <ProseH2 class="text-2xl">
      Aperçu des répartitions actuelles
    </ProseH2>
    <UTable
      :data="sortedVotes"
      :columns="columns2"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, resolveComponent } from 'vue'

const UButton = resolveComponent('UButton')

const modifs = useState<updateData[]>('modifs', () => [])
const { data: ateliers } = useNuxtData('ateliers')
const { data: votes } = useNuxtData('votes')
const toast = useToast()

const props = defineProps<{
  classe: string
}>()

const bmodifs = computed(() => modifs.value.map(el => ({
  assignJ1atelier: el.assignJ1atelier ?? el.shJ1atelier,
  assignJ2atelier: el.assignJ2atelier ?? el.shJ2atelier,
  assignJ1jour: el.assignJ1jour,
  assignJ2jour: el.assignJ2jour,
  userId: el.userId,
})))

const columns = [
  { accessorKey: 'userId', header: 'élève', cell: ({ cell }) => {
    const v = votes.value.find(el => el.userId === cell.getValue())
    return `${v.firstName} ${v.lastName}`
  } },
  { accessorKey: 'assignJ1atelier', header: 'Atelier 1', cell: ({ cell }) => {
    const atelier = ateliers.value?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'N/A'
  } },
  { accessorKey: 'assignJ1jour', header: 'Jour 1', cell: ({ cell }) => ['', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi'][cell.getValue()] },
  { accessorKey: 'assignJ2atelier', header: 'Atelier 2', cell: ({ cell }) => {
    const atelier = ateliers.value?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'N/A'
  } },
  { accessorKey: 'assignJ2jour', header: 'Jour 2', cell: ({ cell }) => ['', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi'][cell.getValue()] },
  { accessorKey: 'userId', header: 'Annuler', cell: ({ row }) => {
    const vote = votes.value.find(el => el.userId === row.getValue('userId') as string)
    return h(UButton, {
      icon: 'i-lucide-x',
      variant: 'text',
      color: 'danger',
      onClick: () => {
        cancelVote(vote)
      },
    })
  },
  },
]

const saveModifs = async () => {
  try {
    const res = await $fetch.raw('/api/langues/updateVotes', {
      method: 'PATCH',
      body: modifs.value.map(el => ({
        assignJ1atelier: el.assignJ1atelier ?? el.shJ1atelier,
        assignJ2atelier: el.assignJ2atelier ?? el.shJ2atelier,
        assignJ1jour: el.assignJ1jour,
        assignJ2jour: el.assignJ2jour,
        userId: el.userId,
      })),
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

const sortedVotes = computed(() => {
  return [...votes.value].filter((el) => {
    if (props.classe === 'Toutes') return true
    return JSON.parse(el.classes)[0] === props.classe
  }).sort((a, b) => {
    const tsA = a.lastName
    const tsB = b.lastName
    return tsA.localeCompare(tsB) // décroissant : les plus récents d'abord
  })
})

const columns2 = [
  { accessorKey: 'classes', header: 'Classe', cell: ({ cell }) => JSON.parse(cell.getValue())[0] },

  { accessorKey: 'firstName', header: 'Prénom' },
  { accessorKey: 'lastName', header: 'NOM' },
  { accessorKey: 'assignJ1atelier', header: 'Atelier 1', cell: ({ cell }) => {
    const atelier = ateliers.value?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'élève sans inscription'
  } },
  { accessorKey: 'assignJ1jour', header: 'Jour 1', cell: ({ cell }) => ['', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi'][cell.getValue()] ?? 'N/A' },
  { accessorKey: 'assignJ2atelier', header: 'Atelier 2', cell: ({ cell }) => {
    const atelier = ateliers.value?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'élève sans inscription'
  } },
  { accessorKey: 'assignJ2jour', header: 'Jour 2', cell: ({ cell }) => ['', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi'][cell.getValue()] ?? 'N/A' },
]

const cancelVote = (vote: MergedRow) => {
  if (modifs.value.map(el => el.userId).includes(vote.userId)) {
    const { userId, ...keys } = modifs.value.find((el: updateData) => el.userId === vote.userId)
    Object.keys(keys).forEach((key) => {
      if (key !== 'shJ1atelier' && key !== 'shJ2atelier') {
        votes.value.find((el: MergedRow) => el.userId === vote.userId)[key] = null
      }
    })
    modifs.value = modifs.value.filter((el: updateData) => el.userId !== vote.userId)
    votes.value = [...votes.value]
    toast.add({ title: `Vote de ${vote.firstName} ${vote.lastName} annulé` })
  }
}
</script>

<style scoped>

</style>
