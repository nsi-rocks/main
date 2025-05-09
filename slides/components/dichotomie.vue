<template>
  <div style="margin-bottom: 1rem;">
    <!-- toolbar -->
    <div class="flex items-center gap-4 mb-2">
      <!-- play / reset / speed -->
      <lucide-play
        class="icon"
        :class="{ green: run }"
        @click="runBinarySearch"
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
        @click="animationSpeed = Math.max(100, animationSpeed - 100)"
      />

      <span class="ml-4 text-nowrap">🔎 Cible : <strong>{{ target }}</strong></span>
    </div>

    <!-- bars -->
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
          left: `calc(${index} * (100% / ${numbers.length}))`,
        }"
        class="number-bar"
        :class="{
          left: leftIndex === index,
          right: rightIndex === index,
          mid: midIndex === index,
          found: foundIndex === index,
        }"
      >
        <span class="bar-value">{{ item.val }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* -------- props -------- */
const props = defineProps({
  list: {
    type: Array,
    default: () => [2, 4, 5, 7, 9, 12, 15, 18, 20, 25, 30, 35, 40, 45, 50],
  },
  speed: {
    type: Number,
    default: 300,
  },
})

/* -------- data / state -------- */
const generateTarget = () => props.list[Math.floor(Math.random() * props.list.length)]
const target = ref(generateTarget())
const numbers = ref(props.list.map(val => ({ val })))
const animationSpeed = ref(props.speed)

const leftIndex = ref(null)
const rightIndex = ref(null)
const midIndex = ref(null)
const foundIndex = ref(null)
const run = ref(false)

const maxVal = computed(() => Math.max(...numbers.value.map(n => n.val)))

/* -------- utils -------- */
const sleep = ms => new Promise(r => setTimeout(r, ms))
const resetIndexes = () => {
  leftIndex.value = rightIndex.value = midIndex.value = foundIndex.value = null
}

/* -------- actions -------- */
const reset = () => {
  run.value = false
  resetIndexes()
  numbers.value = props.list.map(val => ({ val }))
  target.value = generateTarget()
}

const runBinarySearch = async () => {
  if (run.value) return
  run.value = true
  let left = 0
  let right = numbers.value.length - 1

  while (left <= right && run.value) {
    leftIndex.value = left
    rightIndex.value = right
    await sleep(animationSpeed.value)

    const mid = Math.floor((left + right) / 2)
    midIndex.value = mid
    await sleep(animationSpeed.value)

    const midVal = numbers.value[mid].val
    if (midVal === target.value) {
      foundIndex.value = mid
      break
    }
    else if (midVal < target.value) {
      left = mid + 1
    }
    else {
      right = mid - 1
    }
    await sleep(animationSpeed.value)
  }

  run.value = false
}
</script>

<style scoped>
@keyframes midBlink {
  0% {
    background-color: #f1c40f;
  }
  50% {
    background-color: #ffd95c;
  }
  100% {
    background-color: #f1c40f;
  }
}

.number-bar {
  position: absolute;
  bottom: 20px; /* place for label */
  width: calc(80% / var(--count));
  background-color: aqua;
  border-radius: 5px;
  transition: left 0.5s ease-in, width 0.5s ease-in;
}

.bar-value {
  position: absolute;
  bottom: -1.2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: var(--vp-c-text-2, #444);
}

.left {
  background-color: #3498db;
}
.right {
  background-color: #8e44ad;
}
.mid {
  animation: midBlink 1s infinite;
}
.found {
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
