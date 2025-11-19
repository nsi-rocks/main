<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
})

const lp = useLocalePath()
const dateRentree = new Date('2025-09-01')
const semaine = ref<number | null>(null)

onMounted(() => {
  semaine.value = weeksElapsedSince(dateRentree.getTime())
})

const periodes = [7, 2, 7, 2, 5, 2, 6, 2, 11]

function weeksElapsedSince(startDate: number) {
  const now = Date.now()
  const diffInMilliseconds = now - startDate
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000
  return Math.floor(diffInMilliseconds / millisecondsPerWeek) + 1
}

const periodesAccumulated = periodes.reduce((acc, el) => {
  acc.push(acc[acc.length - 1]! + el)
  return acc
}, [0]).slice(1)
const sum = ref(0)
periodes.map(el => sum.value += el)

const linksnsi = ref([
  {
    label: 'Algorithmique',
    icon: 'i-lucide-arrow-down-0-1',
    to: lp('/nsi/algorithmique'),
  },
  {
    label: 'Architecture',
    icon: 'i-lucide-cpu',
    to: lp('/nsi/architecture'),
  },
  {
    label: 'Linux',
    icon: 'i-devicon-linux',
    to: lp('/nsi/linux'),
  },
  {
    label: 'Python',
    icon: 'i-vscode-icons-file-type-python',
    to: lp('/nsi/python'),
  },
  {
    label: 'Capytale',
    icon: 'i-custom-capytale',
    to: 'https://capytale2.ac-paris.fr',
    target: '_blank',
  },
  {
    label: 'Excalidraw',
    icon: 'vscode-icons-file-type-excalidraw',
    to: 'https://excalidraw.com',
    target: '_blank',
  },
])

const linkssnt = [
  {
    label: 'Création de sites',
    icon: 'i-vscode-icons-file-type-html',
    to: lp('/snt/cds'),
  },
  {
    label: 'Web et données',
    icon: 'i-lucide-globe',
    to: lp('/snt/web'),
  },
  {
    label: 'Images numériques',
    icon: 'i-vscode-icons-file-type-image',
    to: lp('/snt/photo'),
  },
  {
    label: 'Capytale',
    icon: 'i-custom-capytale',
    to: 'https://capytale2.ac-paris.fr',
    target: '_blank',
  },
  {
    label: 'Excalidraw',
    icon: 'vscode-icons-file-type-excalidraw',
    to: 'https://excalidraw.com',
    target: '_blank',
  },
]
</script>

<template>
  <UPageBody>
    <UPageGrid class="lg:grid-cols-2">
      <UPageCard
        title="NSI"
        :description="$t('nsi')"
        variant="subtle"
        orientation="horizontal"
      >
        <UPageAnchors :links="linksnsi" />
      </UPageCard>
      <UPageCard
        title="SNT"
        :description="$t('snt')"
        variant="subtle"
        orientation="horizontal"
      >
        <UPageAnchors :links="linkssnt" />
      </UPageCard>
    </UPageGrid>
    <div class="flex flex-row flex-wrap w-2/3 mx-auto my-16 gap-2">
      <div
        v-for="i in sum"
        :key="i"
        class="w-8 h-8"
        :class="[periodesAccumulated.findIndex(el => el >= i) % 2 == 0 ? 'bg-blue-400' : 'bg-slate-700', semaine !== null && i === semaine ? 'ring-2 ring-offset-2' : '']"
      />
    </div>
  </UPageBody>
</template>

<style></style>
