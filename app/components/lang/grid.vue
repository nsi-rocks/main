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
              <li>{{ votes.filter(el => (el.assignJ1atelier === atelier.id && el.assignJ1jour === j) || (el.assignJ2atelier === atelier.id && el.assignJ2jour === j)).length }} choix ce jour</li>
              <li>{{ votes.filter(el => el.assignJ2atelier === atelier.id && el.assignJ2jour === null).length }} choix à répartir</li>
            </ul>
          </div>
        </div>
      </template>
    </UPageCard>
  </div>
</template>

<script lang="ts" setup>
import { LazyLangAssign } from '#components'

const { data: votes } = useNuxtData('votes')

const { data: ateliers } = useNuxtData('ateliers')

const jours = ['Choix2', 'Lundi', 'Mardi', 'Jeudi', 'Vendredi']

const overlay = useOverlay()
const slideover = overlay.create(LazyLangAssign)

const assignAtelier = (id: number) => {
  console.log('Atelier ID:', id)
  slideover.open({
    atelierId: id,
    atelier: ateliers.value?.find(atelier => atelier.id === id),
  })
}
</script>

<style scoped>

</style>
