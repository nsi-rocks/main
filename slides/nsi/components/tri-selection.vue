<template>
  <div style="margin-bottom: 1rem;">
    <div class="flex items-center gap-4">
      <lucide-play
        class="icon"
        :class="{ green: run === true }"
        @click="runSelectionSort"
      />
      <lucide-refresh-ccw
        class="icon"
        @click="reset"
      />
      <lucide-minus
        class="icon"
        @click="animationSpeed += 100"
      />
      <lucide-plus
        class="icon"
        @click="animationSpeed -= 100"
      />
    </div>

    <transition-group
      name="slide"
      tag="div"
      :style="{
        '--count': numbers.length,
        'height': '100%',
        'position': 'relative',
        'marginTop': '2rem',
      }"
    >
      <div
        v-for="(item, index) in numbers"
        :key="index"
        :style="{
          height: (item.val / maxVal * 100) + '%',
          left: `calc(${item.pos} * (100% / ${numbers.length}))`,
        }"
        class="number-bar"
        :class="{ active: activeIndex === index, compare: compareIndex === index, mini: miniIndex === index }"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const animationSpeed = ref(300)
const activeIndex = ref(null)
const compareIndex = ref(null)
const miniIndex = ref(null)
const run = ref(false)
const maxVal = computed(() => Math.max(...numbers.value.map(n => n.val)))
const props = defineProps({
  list: {
    type: Array,
    default: () => [18, 3, 8, 10, 2, 9, 1, 7, 12],
  },
})

const makeNumbers = src =>
  src.map((n, i) => ({ pos: i, val: n }))

let minIndex

const numbers = ref(makeNumbers([...props.list]))

const reset = () => {
  run.value = false
  activeIndex.value = compareIndex.value = miniIndex.value = null
  numbers.value = makeNumbers([...props.list])
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
      if (run.value === false) {
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
  return new Promise(resolve => setTimeout(resolve, ms))
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
  width: calc(80% / var(--count));
  margin-right: 0;
  background-color: aqua;
  border-radius: 5px;
  transition: left 0.5s ease-in, width 0.5s ease-in;
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
