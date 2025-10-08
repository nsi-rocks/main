<template>
  <div style="margin-bottom: 1rem;">
    <div class="flex items-center gap-4">
      <Icon
        name="ic:round-play-circle"
        class="icon"
        :class="{ green: run }"
        @click="runInsertionSort"
      />
      <Icon
        name="ic:baseline-replay-circle-filled"
        class="icon"
        @click="reset"
      />

      <!-- Sélecteur de vitesse partagé avec le tri par sélection -->
      <USlider
        v-model="animationSpeed"
        :min="200"
        :max="2000"
      />
    </div>

    <transition-group
      name="slide"
      tag="div"
      :style="{
        '--count': numbers.length,
        'height': '300px',
        'position': 'relative',
        'marginTop': '2rem',
      }"
    >
      <div
        v-for="(item, index) in numbers"
        :key="index"
        :style="{
          height: `${(item.val / maxVal) * 100}%`,
          left: `calc(${item.pos} * (100% / ${numbers.length}))`,
        }"
        class="number-bar"
        :class="{ active: activeIndex === index }"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ------------- données "brutes" ------------- */
const base = [5, 3, 8, 10, 2, 9, 1, 7, 12]
const makeNumbers = arr => arr.map((n, i) => ({ pos: i, val: n }))

/* ------------- state ------------- */
const numbers = ref(makeNumbers([...base]))
const animationSpeed = ref(300)
const activeIndex = ref(null)
const run = ref(false)

const maxVal = computed(() => Math.max(...numbers.value.map(n => n.val)))

/* ------------- helpers ------------- */
const sleep = ms => new Promise(r => setTimeout(r, ms))
const resetIndexes = () => (activeIndex.value = null)

/**
 * Décale la barre située à `pos` d'une case vers la droite (+1).
 * Utilisé par l'algo d'insertion pour "faire de la place".
 */
const shiftRight = (pos) => {
  const fromIdx = numbers.value.findIndex(e => e.pos === pos)
  const toIdx = numbers.value.findIndex(e => e.pos === pos + 1)
  if (fromIdx === -1 || toIdx === -1) return
  numbers.value[fromIdx].pos += 1
  numbers.value[toIdx].pos -= 1
}

/* ------------- actions ------------- */
const reset = () => {
  run.value = false
  resetIndexes()
  numbers.value = makeNumbers([...base])
}

const runInsertionSort = async () => {
  run.value = true

  for (let i = 1; i < numbers.value.length; i++) {
    const startPos = i
    activeIndex.value = numbers.value.findIndex(e => e.pos === startPos)
    await sleep(animationSpeed.value)

    const currentVal = numbers.value[activeIndex.value].val
    let j = i - 1

    while (j >= 0 && numbers.value.find(e => e.pos === j).val > currentVal) {
      if (!run.value) {
        resetIndexes()
        return
      }
      shiftRight(j)
      j--
      await sleep(animationSpeed.value)
    }
  }

  resetIndexes()
  run.value = false
}
</script>

<style scoped>
@keyframes blinking {
  0%   { background-color: aqua; }
  50%  { background-color: #f1c40f; }
  100% { background-color: aqua; }
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

.active { background-color: green; }

.slide-enter-active, .slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.icon       { font-size: 2rem; cursor: pointer; }
.icon:hover { color: lightgreen; }

.green      { color: green; }
.green:hover{ color: green; }
</style>
