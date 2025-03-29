<template>
  <VisXYContainer :data="data" :width="500" :height="300">
    <VisGroupedBar :x="x" :y="y" />
    <VisAxis :gridLine="false" type="x" :tickFormat="tickFormat" :numTicks="data.length" />
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
const x = (d: DataRecord, i: number) => i
const y = [(d: DataRecord) => d.count]

const tickFormat = (d: number) => props.data[d]?.classe

const triggers = {
  [GroupedBar.selectors.bar]: (d: DataRecord) => `
      <span>${d.classe}: ${d.count}</span>
    `
}

console.log(props.data);

</script>

<style scoped></style>