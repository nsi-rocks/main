<template>
  <UDashboardPanel
    id="eleves-1"
    resizable
    :min-size="20"
    :max-size="80"
    :default-size="30"
  >
    <template #header>
      <UDashboardNavbar title="Images">
        <template #right>
          <USelect
            v-model="selectedClass"
            :items="allClasses"
            placeholder="Classe"
            class="w-40"
          />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <UCard
        v-for="eleve in filteredView"
        :key="eleve.id"
        :title="eleve.firstName + eleve.lastName"
      >
        <template #header>
          <div class="flex items-center">
            <UIcon
              name="i-lucide-user"
              class="mr-2"
            />
            <span>{{ eleve.firstName }} {{ eleve.lastName }}</span>
            <UBadge
              v-if="!eleve.teacher"
              variant="soft"
              size="lg"
              class="ml-auto"
            >
              {{ eleve.classes }}
            </UBadge>
          </div>
        </template>
        <div class="flex items-center">
          <UIcon
            name="i-lucide-mail"
            class="mr-2"
          />
          {{ eleve.teacher }}
        </div>
      </UCard>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts" setup>
import { adminOrDev } from '~~/shared/utils/abilities'

definePageMeta({
  layout: 'dashboard',
})

if (await denies(adminOrDev)) {
  navigateTo('/')
}

const { data } = await useFetch('/api/eleves')
const allClasses = ref()
const selectedClass = ref()

const filteredView = computed(() => {
  return selectedClass.value ? data.value?.filter(el => el.classes === selectedClass.value) : data.value
})

watchEffect(() => {
  if (!data.value) return
  allClasses.value = [...new Set(data.value.flatMap((entry) => {
    try {
      return JSON.parse(entry.classes) // Si c'est un JSON string, on le parse
    }
    catch {
      return [entry.classes] // Sinon, c'est une string simple
    }
  }))]
})

const updateClass = async (id: string, rawClass: string) => {
  try {
    const pClass = JSON.parse(rawClass).map((c: string) => c.split('$')[1])
    await $fetch(`/api/eleves/${id}`, {
      method: 'PATCH',
      body: { classes: JSON.stringify(pClass) },
    })
  }
  catch (e) {
    console.error(e)
  }
}

const massUpdate = async () => {
  if (!data.value) return
  for (const eleve of data.value) {
    if (!eleve.teacher && eleve.classes.startsWith('[')) {
      updateClass(eleve.id, eleve.classes)
    }
  }
}
</script>

<style scoped></style>
