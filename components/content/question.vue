<template>
  <UCard>
    <template #header v-if="false">
    </template>
    <template #default>
      <ContentSlot :use="$slots.question" />
      <div class="flex flex-row justify-around gap-2">
        <UButton v-for="(r, index) of reps.sort(() => Math.random() - 0.5)" :label="r.label" @click="verif(r)" variant="outline" size="xl" />
      </div>
    </template>
    <template #footer v-if="expli !== -1">
      <ContentSlot :name="expli" />
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps(['reponses'])
const emits = defineEmits(['check'])
const reps = props.reponses.split(',').map((el, index) => {
  const tmp = el.trim().split('.')
  return { label: tmp[1], rep: tmp[0], idx: index}
})
const expli = ref(-1)

const verif = (r) => {
  r.idx === 0 ? emits('check', true) : emits('check', false)
  expli.value = r.rep
}
</script>

<style>

</style>

