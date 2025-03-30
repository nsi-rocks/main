<template>
  <UModal :close="{ onClick: () => emit('close', false) }" title="Confirmation">
    <template #footer>
      <div class="w-full flex flex-row justify-between">
        <UButton color="warning" variant="outline" label="Modifier mes choix" @click="emit('close', true)" />

        <UButton label="Annuler" @click="emit('close', false)" />
      </div>
    </template>
    <template #body>
      <ProseP>Vous êtes sur le point de modifier vos choix. Vous allez être redirigé vers la sélection des ateliers, et
        vous devrez choisir à nouveau deux ateliers.</ProseP>
      <ProseP>Êtes-vous sûr de vouloir continuer ?</ProseP>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>()
</script>