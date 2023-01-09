<template>
  <div class="unicell" :style="{ 'justify-content': jc }">
    <span v-if="gen" class="gen">{{ gen }}</span>
    <div v-for="cll in arrGen" class="cell" :class="cll.value ? 'alive' : 'dead'" @click="toggleCell(cll)">&nbsp;</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String
  },
  gen: {
    type: String
  },
  jc: {
    type: String
  }
})

const arrGen = computed(() => {
  const arrTmp = props.code.split('')
  return arrTmp.map(x => ref(parseInt(x)))
})

function toggleCell(cll) {
  cll.value = !cll.value;
}
</script>

<style scoped>
.cell {
  width: 2rem;
  height: 2rem;
  display: inline;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0.2rem;
}

.dead {
  background-color: white;
}

.alive {
  background-color: black;
}

.gen {
  color: red;
  margin-right: 1rem;
}

.unicell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
