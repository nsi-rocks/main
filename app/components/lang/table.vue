<template>
  {{ sortedVotes.length }} votes
  <UTable
    v-if="votes.length > 0"
    :data="sortedVotes"
    :columns="columns"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  ateliers: AtelierAvecNbChoix[] | undefined
  votes: MergedRow[]
  classe: string
}>()

// const sortedVotes = computed(() => {
//   return [...props.votes].sort((a, b) => {
//     const tsA = Number(a.timestamp ?? 0)
//     const tsB = Number(b.timestamp ?? 0)
//     return tsB - tsA // décroissant : les plus récents d'abord
//   })
// })

const sortedVotes = computed(() => {
  return [...props.votes].filter((el) => {
    if (props.classe === 'Toutes') return true
    return JSON.parse(el.classes)[0] === props.classe
  }).sort((a, b) => {
    const tsA = a.lastName
    const tsB = b.lastName
    return tsA.localeCompare(tsB) // décroissant : les plus récents d'abord
  })
})

const columns = [
  { accessorKey: 'firstName', header: 'Prénom' },
  { accessorKey: 'lastName', header: 'NOM' },
  { accessorKey: 'a1choix', header: 'Atelier 1', cell: ({ cell }) => {
    const atelier = props.ateliers?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'Inconnu'
  } },
  { accessorKey: 'a1jour', header: 'Jour 1', cell: ({ cell }) => ['', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi'][cell.getValue()] },
  { accessorKey: 'a2choix', header: 'Atelier 2', cell: ({ cell }) => {
    const atelier = props.ateliers?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'Inconnu'
  } },
  { accessorKey: 'classes', header: 'Classe', cell: ({ cell }) => JSON.parse(cell.getValue())[0] },
  { accessorKey: 'commentaire', header: 'Commentaire' },
]
</script>

<style scoped>

</style>
