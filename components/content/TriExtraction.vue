<template>
  <div style="margin-bottom: 1rem;">
    <div v-show="false">
      <label>Vitesse d'animation (ms):</label>
      <input type="number" v-model="animationSpeed" />
    </div>

    <Icon @click="runSelectionSort" name="ic:round-play-circle" class="icon" :class="{ 'green': run === true }" />
    <Icon @click="reset" name="ic:baseline-replay-circle-filled" class="icon" />

    <transition-group name="slide" tag="div" style="height: 30px; position: relative; margin-top: 2rem;">
      <div v-for="(item, index) in numbers" :key="index" :style="{ height: 3*item.val + 'px', order: item.pos, left: item.pos*35 + 'px' }" class="number-bar" :class="{ 'active': activeIndex === index, 'compare': compareIndex === index, 'mini': miniIndex === index }" />
    </transition-group>
  </div>
</template>

<script setup>
const numbers = ref([5, 3, 8, 10, 2, 9, 1, 7, 12])
const animationSpeed = ref(1000)
const activeIndex = ref(null)
const compareIndex = ref(null)
const miniIndex = ref(null)
const run = ref(false)
let minIndex

for (let i = 0; i < numbers.value.length; i++) {
  numbers.value[i] = {pos: i, val: numbers.value[i]}
}

const reset = () => {
  numbers.value = [5, 3, 8, 10, 2, 9, 1, 7, 12]
  for (let i = 0; i < numbers.value.length; i++) {
    numbers.value[i] = {pos: i, val: numbers.value[i]}
  }
  run.value = false
}
const moveItem = (from, to) => {
  const fromIndex = numbers.value.findIndex(e => e.pos === from)
  const toIndex = numbers.value.findIndex(e => e.pos === to)
  numbers.value[fromIndex].pos = to
  numbers.value[toIndex].pos = from
}

const resetIndexes = () => {
  activeIndex.value = null
  miniIndex.value = null
  compareIndex.value = null
}

const runSelectionSort = async () => {
  run.value = true
  for (let i = 0; i < numbers.value.length; i++) {

    minIndex = i
    activeIndex.value = numbers.value.findIndex(e => e.pos === i)
    for (let j = i + 1; j < numbers.value.length; j++) {
      if(run.value === false) {
        resetIndexes()
        return 0
      }
      await sleep(animationSpeed.value)
      compareIndex.value = numbers.value.findIndex(e => e.pos === j)

      if (numbers.value.find(e => e.pos === j).val < numbers.value.find(e => e.pos === minIndex).val) {
        minIndex = j
        await sleep(animationSpeed.value)
        miniIndex.value = numbers.value.findIndex(e => e.pos === j)
      }
    }
    if (i !== minIndex) {
      await sleep(animationSpeed.value)
      compareIndex.value = null
      moveItem(i, minIndex)
      activeIndex.value = numbers.value.findIndex(e => e.pos === minIndex)
      await sleep(animationSpeed.value)
    }
    resetIndexes()
  }
  run.value = false
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>
<style scoped>
@keyframes blinking {
  0% {
    background-color: aqua;
  }
  50% {
    background-color: #f1c40f;
  }
  100% {
    background-color: aqua;
  }
}

.number-bar {
  position: absolute;
  bottom: 0;
  width: 30px;
  margin-right: 5px;
  background-color: aqua;
  border-radius: 5px;
  transition: left 0.5s ease-in 0s;
}

.active {
  background-color: green;
}

.compare {
  animation: blinking 1s infinite;
}

.mini {
  background-color: #f1c40f;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.icon {
  font-size: 2rem;
  cursor: pointer;
}

.icon:hover {
  color: lightgreen;
}

.green {
  color: green;
}

.green:hover {
  color: green;
}
</style>
