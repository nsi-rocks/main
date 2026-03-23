<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  code: String,
  gen: String,
  jc: String,
  play: String,
  reset: String,
  step: String,
})

const arrGen = ref(props.code ? props.code.split('').map(c => c === '1') : [])

const originalArrGen = ref([...arrGen.value]) // Create a deep copy or the original array

function playSimulation(generation: number) {
  const newArray = ref([...arrGen.value])

  for (let i = 0; i < arrGen.value.length; i++) {
    const cells = []
    if (i > 0) {
      cells.push(arrGen.value[i - 1])
    }

    if (i < arrGen.value.length - 1) {
      cells.push(arrGen.value[i + 1])
    }

    if (arrGen.value[i] === false) {
      let a = 0
      cells.forEach((v) => {
        if (v === true) {
          a++
        };
      })
      if (a != 0) {
        newArray.value[i] = !newArray.value[i]
      }
    }
  }
  arrGen.value = [...newArray.value]
}

function resetSimulation() {
  arrGen.value = [...originalArrGen.value]
}

function toggleCell(index: string | number) {
  if (props.play) {
    arrGen.value[index] = !arrGen.value[index]
  }
}
</script>

<template>
  <div class="content">
    <div
      class="unicell"
      :style="{ 'justify-content': jc }"
    >
      <span
        v-if="gen"
        class="gen"
      >Gen. {{ gen }}</span>
      <div
        v-for="(cll, index) in arrGen"
        :key="index"
        class="cell"
        :class="{ alive: cll, dead: !cll, clickable: play }"
        @click="toggleCell(index)"
      />
    </div>
    <div class="buttons">
      <button
        v-if="play"
        class="icon-button play-button"
        @click="playSimulation()"
      >
        <UIcon name="i-lucide-play" />
      </button>
      <button
        v-if="reset"
        class="icon-button reset-button"
        @click="resetSimulation()"
      >
        <UIcon name="i-lucide-rotate-ccw" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.icon-button {
  background-color: transparent;
  color: currentColor;
  border: 1px solid currentColor;
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.icon-button:hover {
  opacity: 1;
}

.play-button {
  color: green;
}

.reset-button {
  color: red;
}

.cell {
  width: 2rem;
  height: 2rem;
  display: inline;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0.2rem;
}

.cell.clickable {
  cursor: pointer;
}

.cell.clickable:hover {
  opacity: 0.7;
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
  margin-left: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
