<template>
  <UPageBody prose>
    <ContentDoc />

    <div class="flex flex-row flex-wrap w-2/3 mx-auto mt-16 gap-2">
      <div
        v-for="i in sum"
        :key="i"
        class="w-8 h-8"
        :class="[periodesAccumulated.findIndex(el => el >= i) % 2 == 0 ? 'bg-blue-400' : 'bg-slate-700', i === semaine ? 'ring-2 ring-offset-2' : '']"
      />
    </div>
  </UPageBody>
</template>

<script lang="ts" setup>
const semaine = 5
const periodes = [7, 2, 7, 2, 5, 2, 6, 2, 6, 2, 5]


const periodesAccumulated = periodes.reduce((acc, el) => {
  acc.push(acc[acc.length - 1]! + el)
  return acc
}, [0]).slice(1)
const sum = ref(0)
periodes.map(el => sum.value += el)


</script>

<style>

</style>
