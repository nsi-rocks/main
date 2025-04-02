<template>
  <div class="grid grid-cols-5 grid-rows-1 gap-8 p-8 h-48">
    <UCard class="self-start">
      {{ ateliersTotal / 2 }} inscriptions au total
    </UCard>

    <BarsGraph
      v-if="votes.length > 0"
      :data="dataGraph"
      class="col-span-2"
    />
  </div>
  <UTable
    v-if="votes.length > 0"
    :data="votes"
    :columns="columns"
  />
</template>

<script lang="ts" setup>
interface AtelierAvecNbChoix extends Atelier {
  nbChoix: [number, number, number, number, number]
}

interface DataRecord {
  classe: string
  count: number
}

const columns = [
  { accessorKey: 'user', label: 'Utilisateur' },
  { accessorKey: 'a1choix', label: 'Atelier 1', cell: ({ cell }) => {
    const atelier = props.ateliers?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'Inconnu'
  } },
  { accessorKey: 'a1jour', label: 'Jour 1', cell: ({ cell }) => ['', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi'][cell.getValue()] },
  { accessorKey: 'a2choix', label: 'Atelier 2', cell: ({ cell }) => {
    const atelier = props.ateliers?.find(atelier => atelier.id === cell.getValue())
    return atelier ? atelier.titre : 'Inconnu'
  } },
  { accessorKey: 'classes', label: 'Classe', cell: ({ cell }) => JSON.parse(cell.getValue())[0] },
  { accessorKey: 'commentaire', label: 'Commentaire' },
]
const props = defineProps<{
  ateliers: AtelierAvecNbChoix[] | undefined
  tabs: Array<{
    value: number
    label: string
  }>
}>()

const emit = defineEmits<(e: 'dashboardMount' | 'dashboardUnmount') => void>()

type MergedRow = Langue & Partial<User>

const votes = ref<MergedRow[]>([])

onMounted(async () => {
  emit('dashboardMount')
  votes.value = await $fetch('/api/langues/getVotes')
})

onBeforeUnmount(() => {
  emit('dashboardUnmount')
})

const dataGraph = computed(() => {
  return getClassesCount(votes.value)
})

const ateliersTotal = computed(() => {
  return props.ateliers?.reduce((acc, atelier) => {
    return acc + atelier.nbChoix.reduce((sum, val) => sum + val, 0)
  }, 0) ?? 0
})

function getClassesCount(data: MergedRow[]): DataRecord[] {
  const classesCount = data.reduce((acc: Record<string, number>, obj) => {
    // Convertir la chaîne de caractères représentant la liste de classes en tableau
    const classes = JSON.parse(obj.classes as string)

    // Parcourir les classes et incrémenter leur occurrence
    classes.forEach((classe: string) => {
      if (acc[classe]) {
        acc[classe]++
      }
      else {
        acc[classe] = 1
      }
    })

    return acc
  }, {})

  // Transformer l'objet en un tableau d'objets avec les propriétés `classe` et `count`
  return Object.entries(classesCount).map(([classe, count]) => ({
    classe,
    count,
  })) as DataRecord[]
  // return classesCount
}
</script>

<style scoped></style>
