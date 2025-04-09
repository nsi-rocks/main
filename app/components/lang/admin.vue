<template>
  <LangTable
    v-if="panel === 0"
    :ateliers="ateliers"
    :votes="votes"
    :classe="classe"
  />
  <LangGrid
    v-else-if="panel === 1"
    :ateliers="ateliers"
    :votes="votes"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  ateliers: AtelierAvecNbChoix[]
  votes: MergedRow[]
  panel: number
  classe: string
}>()
</script>

<style scoped>

</style>
