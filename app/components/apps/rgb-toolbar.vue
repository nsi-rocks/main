<template>
  <div class="w-fit my-4 flex">
    <div class="flex flex-row gap-4">
      <UTooltip
        text="Télécharger l'image"
        :popper="{ arrow: true }"
      >
        <UButton
          size="2xl"
          variant="ghost"
          icon="material-symbols:cloud-download"
          class="cursor-pointer"
          @click="$emit('getPng')"
        />
      </UTooltip>

      <UTooltip
        text="Réinitialiser l'image"
        :popper="{ arrow: true }"
      >
        <UButton
          size="2xl"
          variant="ghost"
          icon="material-symbols:format-color-reset"
          class="cursor-pointer"
          @click="$emit('resetCases')"
        />
      </UTooltip>

      <UTooltip
        text="Appliquer la couleur à toutes les cases"
        :popper="{ arrow: true }"
      >
        <UButton
          size="2xl"
          variant="ghost"
          icon="ion:ios-color-fill"
          class="cursor-pointer"
          :disabled="!canApply"
          @click="$emit('applyColor')"
        />
      </UTooltip>

      <UTooltip
        text="Réduire le nombre de cases"
        :popper="{ arrow: true }"
      >
        <UButton
          size="2xl"
          variant="ghost"
          icon="ion:ios-remove-circle"
          class="cursor-pointer"
          :disabled="!candown"
          @click="$emit('sizeDown')"
        />
      </UTooltip>

      <UTooltip
        text="Augmenter le nombre de cases"
        :popper="{ arrow: true }"
      >
        <UButton
          size="2xl"
          variant="ghost"
          icon="ion:ios-add-circle"
          class="cursor-pointer"
          :disabled="!canup"
          @click="$emit('sizeUp')"
        />
      </UTooltip>

      <UTooltip
        text="Partager"
        :popper="{ arrow: true }"
      >
        <UButton
          size="2xl"
          variant="ghost"
          icon="ion:ios-share"
          class="cursor-pointer"
          @click="$emit('share')"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['resetCases', 'applyColor', 'getPng', 'sizeUp', 'sizeDown', 'share'])
defineProps<{ canApply: boolean, canup: boolean, candown: boolean }>()
</script>

<style>

</style>
