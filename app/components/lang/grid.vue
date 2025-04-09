<template>
  <div class="grid grid-cols-3 gap-4">
    <UPageCard
      v-for="atelier in ateliers"
      :key="atelier.id"
      class="cursor-pointer"
      @click="assignAtelier(atelier.id)"
    >
      <template #body>
        <ProseH3 class="my-0">
          {{ atelier.titre }}
        </ProseH3>
        <MDC :value="atelier.description || ''" />
        <span><strong>max :</strong> {{ atelier.max }}</span>
      </template>
      <template #footer>
        <div class="grid grid-cols-2 items-center justify-between">
          <div
            v-for="(j, idx) in atelier.jours"
            :key="j+idx"
          >
            <strong>{{ jours[j] }}</strong> :
            <ul>
              <li>{{ atelier.nbChoix[j] }} choix ce jour</li>
              <li>{{ atelier.nbChoix[0] }} choix à répartir</li>
            </ul>
          </div>
        </div>
      </template>
    </UPageCard>
  </div>
</template>

<script lang="ts" setup>
import { LazyLangAssign } from '#components'

const props = defineProps<{
  ateliers: AtelierAvecNbChoix[] | undefined
  votes: MergedRow[]
}>()

const jours = ['Choix2', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi']

const overlay = useOverlay()
const slideover = overlay.create(LazyLangAssign)

const assignAtelier = (id: number) => {
  console.log('Atelier ID:', id)
  slideover.open({
    atelierId: id,
    atelier: props.ateliers?.find(atelier => atelier.id === id),
    votes: props.votes.filter(vote => vote.a1choix === id || vote.a2choix === id),
  })
}
</script>

<style scoped>

</style>
