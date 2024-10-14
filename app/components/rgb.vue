<template>
  <ClientOnly>
    <div v-if="isGridReady" class="flex flex-col-reverse md:flex-row items-start md:items-center md:h-full md:max-w-[100vw] justify-between mb-8">
      <div class="w-full md:grow self-center">
        <div
          id="pixel-grid"
          class="grid gap-2 m-auto max-w-[50vh] md:max-w-[80vh] mt-4 md:mt-0"
          :style="grcols"
        >
          <div
            v-for="(d, i) in data"
            :key="i"
            class="border box-border cursor-pointer hover:border-2"
            :class="curr === i && mode === 1 ? 'ring ring-blue-600 ring-offset-1' : ''"
            :style="getbg(i)"
            style="aspect-ratio: 1 / 1;"
            draggable="true"
            :data-index="i"
            @click="handleClick(i)"
            @dragstart="handleDragStart($event, data[i])"
            @dragenter="enterDrag"
            @dragleave="leaveDrag"
            @dragover.prevent
            @drop="drop($event, i)"
            @touchstart="handleTouchStart($event, data[i])"
            @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event, i)"
          />
        </div>
      </div>
      <div class="w-full md:w-fit md:self-start flex flex-col gap-2 p-0 sm:p-4">
        <RgbToolbar
          :can-apply="mode === 1"
          :canup="ca < 10 && images.length === 1"
          :candown="ca > 1 && images.length === 1"
          @reset-cases="resetCases"
          @apply-color="resetCases(data[curr])"
          @get-png="getPNG"
          @size-up="resize('up')"
          @size-down="resize('down')"
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
                    @update:model-value="data[curr] = { r: allColors, g: allColors, b: allColors }"
                  />
                </UFormGroup>
              </div>
            </template>
          </template>
        </UTabs>
        <UCard class="hidden md:block">
          <template #header>
            <div class="flex flex-row items-center">
              <h3 class="grow">
                Images
              </h3>
              <UInput v-model="dur" class="max-w-16" />
              <UButton
                icon="ion:md-copy"
                variant="ghost"
                class="text-lg"
                @click="addWCopyImg(currImg)"
              />
              <UButton
                icon="ion:md-add"
                variant="ghost"
                class="text-lg"
                @click="addImg"
              />
            </div>
          </template>

          <div class="flex flex-col">
            <div v-for="img in images" :key="img.id" class="flex flex-row justify-between w-52">
              <div class="flex items-center rounded-md p-2 gap-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-36" @click="img.click">
                <UIcon :name="img.icon" class="w-5 h-5" :class="img.id === currImg ? 'text-primary-500' : ''" />
                <span class="grow" :class="img.id === currImg ? 'text-primary-500' : ''">{{ img.label }}</span>
              </div>
              <div>
                <UTooltip v-if="images.length > 1 && img.id !== currImg" text="Copier les pixels dans l'image actuelle" :popper="{ arrow: true }">
                  <UButton
                    icon="ion:arrow-up-right-box-outline"
                    variant="ghost"
                    class="text-lg"
                    :class="img.id === 0 ? 'mr-8' : ''"
                    @click="cpImg(img.id)"
                  />
                </UTooltip>
                <UTooltip v-if="img.id > 0" text="Supprimer l'image" :popper="{ arrow: true }">
                  <UButton
                    icon="ion:trash-outline"
                    variant="ghost"
                    class="text-lg"
                    @click="delImg(img.id)"
                  />
                </UTooltip>
              </div>
            </div>
          </div>
        </UCard>
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
              <UButton variant="ghost" @click="getPNG">
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
const tmp = reactive({ r: 0, g: 0, b: 0 })
const images = ref([{
  id: 0,
  label: 'Image 0',
  icon: 'ion:md-image',
  data: [],
  click: () => {
    changeImg(0)
  },
}])

const dur = ref(1000)

const logImg = () => {
  images.value.find(el => el.id === currImg.value).data = [...data.value]
}

const addImg = () => {
  logImg()
  const imgId = images.value.at(-1).id + 1
  images.value.push({
    id: imgId,
    label: `Image ${imgId}`,
    icon: 'ion:md-image',
    data: [],
    click: () => {
      changeImg(imgId)
    },
  })
  initGrid()
  currImg.value = imgId
}

const changeImg = (imgId) => {
  logImg()
  currImg.value = imgId
  const newImg = images.value.find(el => el.id === imgId).data
  data.value = [...newImg]
}
const currImg = ref(0)

const delImg = (imgId) => {
  if (images.value.length === 1) return
  const index = images.value.findIndex(img => img.id === imgId)
  images.value.splice(index, 1)
  if (currImg.value === imgId) {
    currImg.value = 0
    data.value = images.value[currImg.value].data
  }
}

const cpImg = (imgId) => {
  const datapx = toRaw(images.value.find(el => el.id === imgId).data)
  data.value = datapx.map(el => ({ ...el }))
}

const addWCopyImg = (imgId) => {
  addImg()
  cpImg(imgId)
}

defineShortcuts({
  arrowLeft: () => move('left'),
  arrowRight: () => move('right'),
  arrowUp: () => move('up'),
  arrowDown: () => move('down'),
  a: () => addImg(),
  c: () => addWCopyImg(currImg.value),
})
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

const resize = (updown: string) => {
  if (updown === 'up' && ca.value < 10) {
    const backup = toRaw(data.value)
    ca.value += 1
    initGrid()
    data.value.forEach((d, i) => {
      if (i < ((ca.value - 1) * ca.value) && i % (ca.value) < (ca.value - 1))
        data.value[i] = { ...backup[i - ~~(i / ca.value)] }
    })
  }
  else if (updown === 'down' && ca.value > 1) {
    curr.value = curr.value >= (ca.value - 1) ** 2 ? (ca.value - 1) ** 2 - 1 : curr.value
    const backup = toRaw(data.value).filter((_, i) => (i + 1) % (ca.value) !== 0)
    ca.value -= 1
    initGrid()
    data.value.forEach((d, i) => data.value[i] = { ...backup[i] })
  }
  // initGrid()
}

const refreshAllColors = () => {
  allColors.value = Object.values(data.value[curr.value]).reduce((a, b) => a + b) / 3
}

const move = (direction: string) => {
  if (direction === 'left') toLeft()
  else if (direction === 'right') toRight()
  else if (direction === 'up') toUp()
  else if (direction === 'down') toDown()
  refreshAllColors()
}

const toLeft = () => {
  const backup = toRaw(data.value).map((d, i) => (i) % (ca.value) === 0 ? { ...base } : d)
  initGrid()
  data.value.forEach((d, i) => {
    if (i < cases.value - 1)
      data.value[i] = { ...backup[i + 1] }
  })
}

const toRight = () => {
  const backup = toRaw(data.value).map((d, i) => i % ca.value === (ca.value - 1) ? { ...base } : d)
  initGrid()
  data.value.forEach((d, i) => {
    if (i > 0)
      data.value[i] = { ...backup[i - 1] }
  })
}

const toUp = () => {
  const backup = toRaw(data.value).map((d, i) => i < ca.value ? { ...base } : d)
  initGrid()
  data.value.forEach((d, i) => {
    if (i < cases.value - ca.value)
      data.value[i] = { ...backup[i + ca.value] }
  })
}

const toDown = () => {
  const backup = toRaw(data.value).map((d, i) => i >= cases.value - ca.value ? { ...base } : d)
  initGrid()
  data.value.forEach((d, i) => {
    if (i >= ca.value)
      data.value[i] = { ...backup[i - ca.value] }
  })
}

const shareGrid = async () => {
  logImg()

  const toSend = images.value.length > 1
    ? images.value.map(el => el.data.map(({ r, g, b }) => [r, g, b]).flat())
    : data.value.map(({ r, g, b }) => [r, g, b]).flat()

  const stringData = JSON.stringify({
    nbCases: ca.value,
    pixels: toSend,
    duration: dur.value,
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

const getPNG = () => {
  logImg()

  const toSend = images.value.length > 1
    ? images.value.map(el => el.data.map(({ r, g, b }) => [r, g, b]).flat())
    : data.value.map(({ r, g, b }) => [r, g, b]).flat()

  $fetch<Blob>('/api/topng', {
    method: 'post',
    responseType: 'blob',
    body: {
      nbCases: ca.value,
      pixels: toSend,
      duration: dur.value,
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

// watch(allColors, (val) => {
//   data.value[curr.value] = { r: val, g: val, b: val }
// })

const isOneFrame = (pixels) => {
  if (Array.isArray(pixels) && pixels.every(Number.isInteger)) {
    return true
  }
  else if (Array.isArray(pixels) && pixels.every(Array.isArray)) {
    // on a un tableau de tableaux de pixels
    return false
  }
  throw new Error('pixels should be an array of integers or an array of arrays of integers')
}

const unflattenRgb = (flatArray) => {
  const result = []
  for (let i = 0; i < flatArray.length; i += 3) {
    result.push({ r: flatArray[i], g: flatArray[i + 1], b: flatArray[i + 2] })
  }
  return result
}

const genImages = (pixels) => {
  if (isOneFrame(pixels)) {
    data.value = unflattenRgb(pixels)
  }
  else {
    data.value = unflattenRgb(pixels[0])
    images.value = pixels.map((frame, i) => ({
      id: i,
      label: `Image ${i}`,
      icon: 'ion:md-image',
      data: unflattenRgb(frame),
      click: () => {
        changeImg(i)
      },
    }))
  }
}

const slug = useRoute().params.slug
if (slug) {
  $fetch(`/api/rgb/${slug}`).then((res) => {
    ca.value = res.nbCases
    genImages(res.pixels)
    dur.value = res.duration
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
  if (mode.value === 1) {
    curr.value = i
    allColors.value = 0
  }
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
