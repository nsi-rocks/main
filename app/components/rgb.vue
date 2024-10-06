<template>
  <div class="flex flex-col-reverse md:flex-row items-start my-12 justify-between">
    <div class="w-full md:grow self-center">
      <div id="pixel-grid" class="grid gap-2 m-auto w-2/3" :style="grcols" v-if="isGridReady">
        <div
          v-for="i in cases"
          :key="i"
          class="border box-border cursor-pointer hover:border-2"
          :class="curr === i - 1 && mode === 1 ? 'ring ring-blue-600 ring-offset-1' : ''"
          :style="getbg(i - 1)"
          style="aspect-ratio: 1 / 1;"
          draggable="true"
          :data-index="i - 1"
          @click="handleClick(i - 1)"
          @dragstart="handleDragStart($event, data[i - 1])"
          @dragenter="enterDrag"
          @dragleave="leaveDrag"
          @dragover.prevent
          @drop="drop($event, i - 1)"
          @touchstart="handleTouchStart($event, data[i - 1])"
          @touchmove="handleTouchMove($event)"
          @touchend="handleTouchEnd($event, i - 1)"
        >
  &nbsp;
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 flex flex-col gap-2 p-4">
    <RgbToolbar :canApply="mode === 1" @resetCases="resetCases" @applyColor="resetCases(data[curr])" @getPNG="getPNG" @sizeUp="ca += 1" @sizeDown="ca -= 1" />
      <UTabs v-model="mode" :items="items" class="mb-2">
        <template #item="{ item }">
          <template v-if="item.key === 'rgb'">
            <div class="font-semibold text-xl flex justify-center">
              <span>r: {{ data[curr].r }}, g: {{ data[curr].g }}, b: {{ data[curr].b }}</span>
            </div>
            <div v-for="a in sliders" :key="a">
              <UFormGroup :label="a.label">
                <URange
                  v-model="data[curr][a.key]"
                  :color="a.color"
                  :step="1"
                  :min="0"
                  :max="255"
                />
              </UFormGroup>
            </div>
          </template>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import html2canvas from 'html2canvas'

const getPNG = () => {
  html2canvas(document.getElementById('pixel-grid') || document.body, { onclone(document, element) {
    element.classList.remove('gap-2')
    element.classList.add('bg-transparent')
    const el = element.getElementsByTagName('div')
    for (const e of el) {
      e.classList.remove('border')
      e.classList.remove('box-border')
      e.classList.remove('border-4')
      e.classList.remove('ring')
      e.classList.remove('ring-blue-600')
      e.classList.remove('ring-offset-1')
    }
  } }).then(function (canvas) {
    const link = document.createElement('a')
    link.download = 'pixel-image.png'
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob)
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    })
  })
}

// const ca = parseInt(useRoute().query.cases as string || '3')
const ca = ref(3)
const cases = computed(() => ca.value * ca.value)
const data = ref()


const grcols = computed(() => `grid-template-columns: repeat(${ca.value}, minmax(0, 1fr));`)
const w = ref(2)
const base = { r: 0, g: 0, b: 0 }
const curr = ref(1)
const mode = ref(0)
const color = ref()

const initGrid = () => {
  data.value = Array.from({ length: cases.value }, () => ({ ...base }))
}

initGrid()
watch(ca, initGrid)

const isGridReady = computed(() => {
  return data.value.length === cases.value
})

const items = [{
  key: 'bw',
  label: 'Noir et blanc',
}, {
  key: 'rgb',
  label: 'Couleurs',
}]
const sliders = [{
  label: 'Rouge',
  color: 'red',
  key: 'r',
}, {
  label: 'Vert',
  color: 'green',
  key: 'g',
}, {
  label: 'Bleu',
  color: 'blue',
  key: 'b',
}]

const getbg = (i: number) => {
  const color = data.value[i] || { r: 0, g: 0, b: 0 }
  const { r, g, b } = color
  return `background-color: rgb(${r},${g},${b});`
}

const handleDragStart = (e: DragEvent, itemData) => {
  e.dataTransfer.setData('text/plain', JSON.stringify(itemData))
}

const enterDrag = (e) => {
  e.preventDefault()
  e.target.classList.add('dragover')
}

const leaveDrag = (e) => {
  e.preventDefault()
  e.target.classList.remove('dragover')
}

const drop = (e, i) => {
  e.preventDefault()
  e.target.classList.remove('dragover')
  data.value[i] = JSON.parse(e.dataTransfer.getData('text/plain'))
}

let touchStartX = 0
let touchStartY = 0
let clonedElement: HTMLElement | null = null
let draggedElement: HTMLElement | null = null
const MIN_DRAG_DISTANCE = 10

const handleTouchStart = (e, itemData) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY

  e.target.classList.add('dragging')
  draggedElement = e.target
}

const handleTouchMove = (e) => {
  e.preventDefault()

  if (!draggedElement) return

  const touch = e.touches[0]
  const deltaX = touch.clientX - touchStartX
  const deltaY = touch.clientY - touchStartY

  console.log('Touch move', deltaX, deltaY)

  if (Math.abs(deltaX) > MIN_DRAG_DISTANCE || Math.abs(deltaY) > MIN_DRAG_DISTANCE) {
    console.log('Drag detected')

    if (!clonedElement && draggedElement) {
      clonedElement = draggedElement.cloneNode(true) as HTMLElement

      clonedElement.style.position = 'absolute'
      clonedElement.style.pointerEvents = 'none'
      clonedElement.style.opacity = '0.6'
      clonedElement.style.zIndex = '1000'
      clonedElement.style.transform = 'translate(-50%, -50%)'

      document.body.appendChild(clonedElement)

      clonedElement.style.left = `${touchStartX}px`
      clonedElement.style.top = `${touchStartY}px`
    }

    if (clonedElement) {
      clonedElement.style.left = `${touch.clientX}px`
      clonedElement.style.top = `${touch.clientY}px`
    }
  }

  // Utilisation de elementFromPoint pour déterminer l'élément survolé
  const targetElement = document.elementFromPoint(touch.clientX, touch.clientY)

  const elements = document.getElementsByClassName('box-border')
  for (const el of elements) {
    el.classList.remove('dragover')
  }

  // Ajouter la classe de survol si c'est une case valide
  if (targetElement && targetElement.classList.contains('box-border')) {
    targetElement.classList.add('dragover')
  }
}

const handleTouchEnd = (e: TouchEvent, startIndex: number) => {
  if (!clonedElement) return

  // Utilisation de elementFromPoint pour déterminer la cible finale
  if (e.changedTouches[0] !== undefined) {
    const touch = e.changedTouches[0]
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY)

    // Vérifie si l'élément ciblé est une case et si on a bien un index cible
    if (targetElement && targetElement.classList.contains('box-border')) {
      const targetIndex = parseInt(targetElement.getAttribute('data-index'))

      if (!isNaN(targetIndex) && targetIndex !== startIndex) {
        data.value[targetIndex] = { ...data.value[startIndex] }
      }

      targetElement.classList.remove('dragover')
    }

    // Retirer le clone du document
    document.body.removeChild(clonedElement)
    clonedElement = null

    e.target.classList.remove('dragging')
  }
}

const handleClick = (i: number) => {
  if (mode.value === 1)
    curr.value = i
  else {
    const sum = data.value[i].r + data.value[i].g + data.value[i].b
    if (sum < 382)
      data.value[i] = { r: 255, g: 255, b: 255 }
    else
      data.value[i] = { r: 0, g: 0, b: 0 }
  }
}

const resetCases = (color?) => {
  data.value = Array.from({ length: cases.value }, () => ({ ...base, ...color }))
}
</script>

<style>
.dragover {
  border: 4px dashed gray;
}
</style>
