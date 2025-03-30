<template>
  <div class="grid grid-cols-5 grid-rows-4 gap-8 p-8">
    <UCard class="self-start">{{ ateliersTotal }} inscriptions au total
    </UCard>

    <BarsGraph v-if="votes.length > 0" :data="dataGraph" class="col-span-2" />
  </div>
</template>

<script lang="ts" setup>
interface AtelierAvecNbChoix extends Atelier {
  nbChoix: number;
}

interface DataRecord {
  classe: string
  count: number
}

const props = defineProps<{
  ateliers: AtelierAvecNbChoix[] | undefined
  tabs: Array<{
    value: number
    label: string
  }>
}>()

const emit = defineEmits<{
  (e: 'dashboardMount'): void
  (e: 'dashboardUnmount'): void
}>()

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
  return props.ateliers?.reduce((acc, atelier) => acc + atelier.nbChoix, 0)
})

function getClassesCount(data: MergedRow[]): DataRecord[] {
  const classesCount = data.reduce((acc: Record<string, number>, obj) => {
    // Convertir la chaîne de caractères représentant la liste de classes en tableau
    const classes = JSON.parse(obj.classes as string);

    // Parcourir les classes et incrémenter leur occurrence
    classes.forEach((classe: string) => {
      if (acc[classe]) {
        acc[classe]++;
      } else {
        acc[classe] = 1;
      }
    });

    return acc;
  }, {});

  // Transformer l'objet en un tableau d'objets avec les propriétés `classe` et `count`
  return Object.entries(classesCount).map(([classe, count]) => ({
    classe,
    count
  })) as DataRecord[];
  // return classesCount
}
</script>

<style scoped></style>