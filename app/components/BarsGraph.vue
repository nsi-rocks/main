<template>
  <VisXYContainer :data="sorted">
    <VisGroupedBar
      :x="x"
      :y="y"
    />
    <VisAxis
      :grid-line="false"
      type="x"
      :tick-format="tickFormat"
      :num-ticks="sorted.length"
    />
    <VisTooltip :triggers="triggers" />
  </VisXYContainer>
</template>

<script lang="ts" setup>
import { VisXYContainer, VisAxis, VisGroupedBar, VisTooltip } from '@unovis/vue'
import { GroupedBar } from '@unovis/ts'

interface DataRecord {
  classe: string
  count: number
}
const props = defineProps<{ data: DataRecord[] }>()

const sorted: DataRecord[] = [...props.data].sort((a, b) => {
  const [niveauA, numA] = a.classe.split(' ')
  const [niveauB, numB] = b.classe.split(' ')

  const niveauxOrdre = ['2NDE', '1ERE', 'TERMINALE']

  const niveauIndexA = niveauxOrdre.indexOf(niveauA || '')
  const niveauIndexB = niveauxOrdre.indexOf(niveauB || '')
  if (niveauIndexA !== niveauIndexB) {
    return niveauIndexA - niveauIndexB
  }

  return parseInt(numA!, 10) - parseInt(numB!, 10)
}).filter(d => d.classe.includes('2NDE'))

const x = (d: DataRecord, i: number) => i
const y = [(d: DataRecord) => d.count]

const tickFormat = (d: number) => `${sorted[d]?.classe} \n ${sorted[d]?.count}`

const triggers = {
  [GroupedBar.selectors.bar]: (d: DataRecord) => `
      <span>${d.classe}: ${d.count}</span>
    `,
}

console.log(props.data)
</script>

<style scoped></style>
