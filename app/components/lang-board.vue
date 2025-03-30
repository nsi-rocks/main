<template>
  <div class="grid grid-cols-4 gap-8 p-8">
    <div v-for="jour in tabs" :key="jour.value" class="flex flex-col items-center justify-start">
      <UCard class="w-full" variant="subtle">{{ jour.label }}</UCard>
      <UCard :ui="{ body: 'p-4 sm:p-4' }" class="w-full rounded-none"
        :class="atelier.isExcluding ? 'bg-orange-300/15' : ''"
        v-for="atelier in ateliers?.filter(el => el.jours.includes(jour.value))">
        <div class="flex flex-row justify-between">
          <span>{{ atelier.titre }}</span>
          <span class="text-nowrap">{{ atelier.nbChoix }} / {{ atelier.max }}</span>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface AtelierAvecNbChoix extends Atelier {
  nbChoix: number;
}

defineProps<{
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

onMounted(() => {
  emit('dashboardMount')
})

onBeforeUnmount(() => {
  emit('dashboardUnmount')
})
</script>

<style scoped></style>