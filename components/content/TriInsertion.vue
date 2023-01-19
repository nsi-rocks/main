<template>
  <div style="margin-bottom: 1rem;">
    <div v-show="false">
      <label>Vitesse d'animation (ms):</label>
      <input type="number" v-model="animationSpeed" />
    </div>

    <Icon @click="runInsertionSort" name="ic:round-play-circle" class="icon" :class="{ 'green': run === true }" />
    <Icon @click="reset" name="ic:baseline-replay-circle-filled" class="icon" />

    <transition-group name="slide" tag="div" style="height: 30px; position: relative; margin-top: 2rem;">
      <div v-for="(item, index) in numbers" :key="index" :style="{ height: 3*item.val + 'px', order: item.pos, left: item.pos*35 + 'px' }" class="number-bar" :class="{ 'active': activeIndex === index }" />
    </transition-group>
  </div>
</template>

<script setup>
const numbers = ref([5, 3, 8, 10, 2, 9, 1, 7, 12])
const animationSpeed = ref(1000)
const activeIndex = ref(null)
const run = ref(false)

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
const moveItem = (pos, val) => {
  //numbers.value.push({ pos: 3, val: 7})
  //numbers.value[2].pos += 1
  const firstindex = numbers.value.findIndex(e => e.pos === pos)
  const othindex = numbers.value.findIndex(e => e.pos === pos+val)
  numbers.value[firstindex].pos += val
  numbers.value[othindex].pos -= val

}
const runInsertionSort = async () => {
  run.value = true
  for (let i = 1; i < numbers.value.length; i++) {
    activeIndex.value = numbers.value.findIndex(e => e.pos === i)
    await sleep(animationSpeed.value)
    let current = numbers.value[activeIndex.value].val
    let j = i - 1
    while (j >= 0 && numbers.value.find(e => e.pos === j).val > current) {
      if(run.value === false) {
        activeIndex.value = null
        return 0
      }
      moveItem(j, +1)
      j--
      await sleep(animationSpeed.value)
    }
  }
  activeIndex.value = null
  run.value = false
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
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
