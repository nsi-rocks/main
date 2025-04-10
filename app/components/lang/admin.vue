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
  <LangModifs
    v-else-if="panel === 2"
    :classe="classe"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  panel: number
  classe: string
}>()

const { data: votes } = useNuxtData('votes')
const { data: ateliers } = useNuxtData('ateliers')

const modifs = useState<updateData[]>('modifs', () => [])
</script>

<style scoped>

</style>
