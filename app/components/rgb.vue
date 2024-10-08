<template>
  <ClientOnly>
    <div v-if="isGridReady" class="flex flex-col-reverse md:flex-row items-start justify-between myheight">
      <div class="w-full md:grow self-center">
        <div
          id="pixel-grid"
          class="grid gap-2 m-auto max-w-[50vh] md:max-w-[80vh] mt-4"
          :style="grcols"
        >
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
      <div class="w-full md:w-1/3 flex flex-col gap-2 p-0 sm:p-4">
        <RgbToolbar
          :can-apply="mode === 1"
          @reset-cases="resetCases"
          @apply-color="resetCases(data[curr])"
          @get-png="getPNG2"
          @size-up="ca += 1; initGrid()"
          @size-down="ca -= 1; initGrid()"
          @share="shareGrid"
        />
        <UTabs v-model="mode" :items="items" class="mb-2 px-4">
          <template #item="{ item }">
            <template v-if="item.key === 'rgb'">
              <div class="font-semibold text-xl flex justify-center">
                <span>r: {{ data[curr].r }}, g: {{ data[curr].g }}, b: {{ data[curr].b }}</span>
              </div>
              <div>
                <UFormGroup v-for="a in sliders" :key="a" :label="a.label">
                  <URange
                    v-model="data[curr][a.key]"
                    :color="a.color"
                    :step="1"
                    :min="0"
                    :max="255"
                  />
                </UFormGroup>
                <UFormGroup label="Toutes">
                  <URange
                    v-model="allColors"
                    color="teal"
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
    <UModal v-model="isOpen">
      <UCard>
        <div class="flex flex-col items-center">
          <p>Votre image est désormais disponible à l'adresse suivante :</p>
          <div class="flex justify-between items-center gap-2">
            <span>https://rgb.nsi.rocks/{{ code }}</span>
            <UButton
              icon="ion:md-clipboard"
              class="text-lg my-4"
              variant="ghost"
              @click="clipCode"
            />
          </div>

          <figure>
            <img :src="`/api/rgb/${code}?img`" alt="Image">
            <figcaption class="flex justify-center my-4">
              <UButton variant="ghost" @click="getPNG2">
                Télécharger
              </UButton>
            </figcaption>
          </figure>
        </div>
      </UCard>
    </UModal>
  </ClientOnly>
</template>

<script lang="ts" setup>
const toast = useToast()
const clipCode = async () => {
  navigator.clipboard.writeText(`https://rgb.nsi.rocks/${code.value}`).then(() => {
    toast.add({
      title: 'Lien copié dans le presse-papier',
    })
  }).catch(() => {
    toast.add({
      title: 'Impossible de copier le lien',
    })
  })
}

const shareGrid = async () => {
  const stringData = JSON.stringify({
    nbCases: ca.value,
    pixels: data.value,
  })
  const hash = mmh3(stringData).toString(16)
  const res = await $fetch('/api/rgb', {
    method: 'post',
    body: {
      hash,
      data: JSON.parse(stringData),
    },
  })
  code.value = res
  isOpen.value = true
}

const getPNG2 = () => {
  $fetch<Blob>('/api/topng', {
    method: 'post',
    responseType: 'blob',
    body: {
      nbCases: ca.value,
      pixels: data.value.map(({ r, g, b }) => [r, g, b]).flat(),
    },
  }).then((canvas: Blob) => {
    const link = document.createElement('a')
    link.download = 'pixel-image.png'
    const url = URL.createObjectURL(canvas)
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  })
}
const initGrid = () => {
  data.value = Array.from({ length: cases.value }, () => ({ ...base }))
}
// const ca = parseInt(useRoute().query.cases as string || '3')
const ca = ref(3)
const cases = computed(() => ca.value * ca.value)
const data = ref([])
const isGridReady = computed(() => {
  return data.value.length === cases.value
})
const grcols = computed(() => `grid-template-columns: repeat(${ca.value}, minmax(0, 1fr));`)
const base = { r: 0, g: 0, b: 0 }
const allColors = ref(0)
const curr = ref(1)
const mode = ref(0)
const isOpen = ref(false)
const code = ref('')

watch(allColors, (val) => {
  data.value[curr.value] = { r: val, g: val, b: val }
})

const slug = useRoute().params.slug
if (slug) {
  $fetch(`/api/rgb/${slug}`).then((res) => {
    ca.value = res.nbCases
    data.value = res.pixels
  }).catch((error) => {
    console.error('Erreur lors de la récupération des données :', error)
    initGrid()
  })
}
else initGrid()

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

.myheight {
  max-height: calc(100vh - 4rem)
}
</style>
