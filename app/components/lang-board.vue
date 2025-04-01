<template>
  <div class="grid grid-cols-4 gap-8 p-8">
    <div
      v-for="jour in tabs"
      :key="jour.value"
      class="flex flex-col items-center justify-start"
    >
      <UCard
        class="w-full rounded-b-none"
        variant="subtle"
      >
        {{ jour.label }}
      </UCard>

      <UCard
        v-for="atelier in ateliers?.filter(el => el.jours.includes(jour.value))"
        :key="atelier.id + '-' + jour.value"
        :ui="{ body: 'p-4 sm:p-4' }"
        variant="subtle"
        class="w-full rounded-none"
        :class="atelier.isExcluding ? 'bg-orange-300/15' : atelier.isCine ? 'bg-blue-300/15' : ''"
      >
        <div class="flex flex-row justify-between">
          <span>{{ atelier.titre }}</span>
          <span class="text-nowrap">
            {{ atelier.nbChoix[jour.value] }} / {{ atelier.max * countSessions(atelier.jours, jour.value) }}
          </span>
        </div>
        <UProgress
          :model-value="atelier.nbChoix.reduce((acc, val) => acc + val, 0)"
          :max="atelier.max * atelier.jours.length"
          size="xs"
          class="mt-2"
        />
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface AtelierAvecNbChoix extends Atelier {
  nbChoix: [number, number, number, number, number]
}

defineProps<{
  ateliers: AtelierAvecNbChoix[] | undefined
  tabs: Array<{
    value: number
    label: string
  }>
}>()

const emit = defineEmits<{
  (e: 'dashboardMount' | 'dashboardUnmount'): void
}>()

onMounted(() => {
  emit('dashboardMount')
})

onBeforeUnmount(() => {
  emit('dashboardUnmount')
})

const countSessions = (jours: number[], jour: number) => {
  return jours.filter(j => j === jour).length
}
</script>

<style scoped></style>
