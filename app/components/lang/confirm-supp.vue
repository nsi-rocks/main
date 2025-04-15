<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    title="Confirmation"
  >
    <template #footer>
      <div class="w-full flex flex-row justify-between">
        <UButton
          class="cursor-pointer"
          label="Annuler"
          variant="outline"
          @click="emit('close', false)"
        />
        <UButton
          label="Confirmer la suppression"
          class="cursor-pointer"
          @click="emit('close', true)"
        />
      </div>
    </template>
    <template #body>
      <ProseP>
        Supprimer l'affectation de {{ data.vote.firstName }} {{ data.vote.lastName }} ?
      </ProseP>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>()
const props = defineProps<{
  data: any
}>()
</script>
