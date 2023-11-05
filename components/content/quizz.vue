<template>
  <div class="flex flex-row gap-2 justify-around mb-2 mt-16">
  <UButton :disabled="qref === 0" icon="i-heroicons-arrow-left" @click="prevQ" />

  <div class="flex flex-row gap-2">
    <UBadge v-for="(c, idx) of q" :ui="{ rounded: 'rounded-full'}" :class="idx === qref ? 'ring-2 ring-offset-2' : 'ring-0'" :color="c.corr.value === null ? 'blue': c.corr.value ? 'green' : 'red'">
    <Icon class="text-xl" :name="c.corr.value === null ? 'material-symbols:question-mark': c.corr.value ? 'i-heroicons-check' : 'i-heroicons-x-mark'" />
    </UBadge>
  </div>

  <UButton :disabled="qref === q.length - 1" icon="i-heroicons-arrow-right" @click="nextQ" />
  </div>

  <component :is="q[qref].component" :key="qref" @check="rep => q[qref].corr.value = rep" />

  <div class="flex flex-row justify-between">
  </div>
</template>

<script lang="ts" setup>
const questions = useSlots()
const q = computed(() => questions.default?.().map((slot, index) => {
  return {
    corr: ref(null),
    component: slot,
  }
}))
const qref = ref(0)

const prevQ = () => { if(qref.value > 0) qref.value-- }
const nextQ = () => { if(qref.value < q.value.length - 1) qref.value++ }

</script>

<style>

</style>

