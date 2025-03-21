<template>
  <UPageCard variant="ghost" orientation="vertical">
    <a :href="`https://rgb.nsi.rocks/${idRgb}`" target="_blank">
      <img :src="`/api/rgb/${idRgb}?img`" class="w-full">
    </a>
    <UButton @click="addToMy" size="lg" variant="solid" class="text-center">Ajouter à mes images</UButton>

    <template #description>
      <transition name="fade">
        <div class="flex flex-row gap-4" v-if="data">
          <UBadge size="xl" variant="subtle" color="primary">{{ pluriel(data.nbImages, 'image') }}</UBadge>
          <UBadge size="xl" variant="subtle" color="success">{{ data.nbCases }} x {{ data.nbCases }} cases</UBadge>
          <UBadge size="xl" variant="subtle" color="info">{{ data.duration }} ms</UBadge>
        </div>
      </transition>
      <div v-if="!data" class="h-8"></div>
    </template>
    <template #title>
      <UPageCard :to="localURL('rgb', idRgb)" target="_blank" variant="outline" spotlight class="mb-8">
        <template #body>
          <div class="flex flex-row justify-center items-start">
            <span class="text-xl">{{ idRgb }}</span>
            <UIcon name="i-lucide-arrow-up-right" class="text-sm" />
          </div>
        </template>
      </UPageCard>
    </template>
  </UPageCard>
</template>

<script lang="ts" setup>

const props = defineProps<{ idRgb: string }>()
const { data } = await useLazyFetch(`/api/rgb/${props.idRgb}?details`)
const toast = useToast()

const addToMy = async () => {
  try {
    const answ = await $fetch<ToastMessage>(`/api/rgb/${props.idRgb}`, { method: "POST" });
    console.log("Réponse du serveur :", answ);
    toast.add(answ)
  } catch (error: any) {
    console.error("Erreur lors de l'ajout :", error);
    if (error.data) toast.add(error.data)
    // Optionnel : afficher une notification utilisateur
    // showErrorMessage(error);
  }
};
const localURL = (prefix: string, route: string) => {
  return import.meta.dev ? `http://${prefix}.localhost.com:3000/${route}` : `https://${prefix}.nsi.rocks/${route}`
}
const pluriel = (nb: number, str: string) => nb > 1 ? nb + ' ' + str + 's' : nb + ' ' + str
const delImg = async (img: string) => {
  data.value = data.value.filter((el: string) => el.split(':')[1] !== img)
  await fetch(`/api/rgb/${img}`, { method: 'DELETE' })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>