<template>
  <div class="flex flex-row items-start my-12 justify-between">
    <div class="grow self-center">
      <div class="m-auto w-fit mb-16">
        <UButton @click="getPNG">
          Télécharger
        </UButton>
      </div>
      <div id="pixel-grid" class="grid gap-2 m-auto w-fit" :style="grcols">
        <div
          v-for="i in cases"
          :key="i"
          class="border box-border cursor-pointer hover:border-2"
          :class="curr === i-1 ? 'border-4' : ''"
          :style="getbg(i-1) + `width: ${w}rem;`"
          style="aspect-ratio: 1 / 1;"
          draggable="true"
          @click="handleClick(i-1)"
          @dragstart="handleDragStart($event, data[i-1])"
          @dragenter="enterDrag"
          @dragleave="leaveDrag"
          @dragover.prevent
          @drop="drop($event, i-1)"
        >
&nbsp;
        </div>
      </div>
    </div>
    <div class="w-1/3 flex flex-col gap-2 p-4 border">
      <URange
        v-model="w"
        :step="0.5"
        :min="1"
        :max="8"
      />
      <UTabs v-model="mode" :items="items" class="mb-12">
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
      <UButton v-if="mode === 1" class="self-center" @click="resetCases(data[curr])">
        Appliquer à toutes
      </UButton>
      <UButton class="self-center" @click="resetCases">
        Remise à zéro
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import html2canvas from 'html2canvas'

const getPNG = () => {
  html2canvas(document.getElementById('pixel-grid') || document.body, { onclone(document, element) {
    element.classList.remove('gap-2')
    const el = element.getElementsByTagName('div')
    for (const e of el) {
      console.log(e);
      
      e.classList.remove('border')
      e.classList.remove('border-4')
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

const ca = parseInt(useRoute().query.cases as string || '3')
const cases = ca * ca
const grcols = `grid-template-columns: repeat(${ca}, minmax(0, 1fr));`
const w = ref(2)
const base = { r: 0, g: 0, b: 0 }
const curr = ref(1)
const mode = ref(0)

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
const data = ref(Array.from({ length: cases }, () => ({ ...base })))

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
  data.value = Array.from({ length: cases }, () => ({ ...base, ...color }))
}
</script>

<style>
.dragover {
  border: 4px dashed gray;
}
</style>
