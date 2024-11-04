<template>
  <div>
    <UInput
      v-model="value"
      placeholder="Entrez le chemin ou l'URL de l'image"
      @keydown.enter="getExif"
    />
    <img
      ref="image"
      :src="value"
      alt="Aperçu de l'image"
    >
    <UButton
      v-if="data.latitude && data.longitude"
      :to="`https://www.openstreetmap.org/?mlat=${data.latitude}&mlon=${data.longitude}#map=8/${data.latitude}/${data.longitude}`"
      variant="ghost"
    >
      OpenStreetMap
    </UButton>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import exifr from 'exifr'

const route = useRoute()

const data = ref({})
const value = ref(route.query.img?.toString() || '/img/photo1.jpg')

const getExif = async () => {
  try {
    const exif = await exifr.parse(value.value)
    data.value = exif
  }
  catch (error) {
    console.error('Erreur lors de la récupération des données EXIF:', error)
    data.value = {}
  }
}
</script>

<style>
</style>
