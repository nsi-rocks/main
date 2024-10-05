<template>
  <div class="m-auto w-fit mb-4 flex flex-row gap-4">
    <UButton
      size="xl"
      variant="ghost"
      icon="material-symbols:cloud-download"
      :ui="{ rounded: 'rounded-full' }"
      @click="$emit('getPNG')"
    />

    <UButton
      size="xl"
      variant="ghost"
      icon="material-symbols:format-color-reset"
      :ui="{ rounded: 'rounded-full' }"
      @click="$emit('resetCases')"
    />

    <UButton
      size="xl"
      variant="ghost"
      icon="ion:ios-color-fill"
      :ui="{ rounded: 'rounded-full' }"
      :disabled="!canApply"
      @click="$emit('applyColor')"
    />

    <UButton
      size="xl"
      variant="ghost"
      icon="ion:ios-remove-circle"
      :ui="{ rounded: 'rounded-full' }"
      @click="$emit('sizeDown')"
    />

    <UButton
      size="xl"
      variant="ghost"
      icon="ion:ios-add-circle"
      :ui="{ rounded: 'rounded-full' }"
      @click="$emit('sizeUp')"
    />
  </div>
</template>

<script lang="ts" setup>
defineEmits(['resetCases', 'applyColor', 'getPNG', 'sizeUp', 'sizeDown'])
defineProps<{ canApply: boolean }>()
</script>

<style>

</style>
