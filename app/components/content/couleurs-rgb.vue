<template>
  <UCard>
    <template #header>
      <div class="flex flex-row justify-center font-semibold text-lg">
        RGB : ({{ rouge }}, {{ vert }}, {{ bleu }})
      </div>
    </template>

    <template #footer>
      <UCard :style="`background-color: rgb(${rouge}, ${vert}, ${bleu})`">
        <div class="flex flex-row justify-center font-semibold text-lg">
          HEX : #{{ rouge.toString(16).padStart(2, '0') }}{{ vert.toString(16).padStart(2, '0') }}{{
            bleu.toString(16).padStart(2, '0') }}
        </div>
      </UCard>
    </template>

    <div class="flex flex-col gap-4">
      <USlider
        v-model="rouge"
        size="xl"
        color="error"
        :min="0"
        :max="255"
      />
      <USlider
        v-model="vert"
        size="xl"
        color="success"
        :min="0"
        :max="255"
      />
      <USlider
        v-model="bleu"
        size="xl"
        color="info"
        :min="0"
        :max="255"
      />
      <USlider
        v-model="gray"
        color="neutral"
        :min="0"
        :max="255"
      />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

const rouge = ref(0)
const vert = ref(0)
const bleu = ref(0)
const gray = ref(0)

watch(gray, (val) => {
  rouge.value = val
  bleu.value = val
  vert.value = val
})
</script>

<style></style>
