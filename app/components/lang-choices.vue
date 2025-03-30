<template>
  <div>
    <UCollapsible class="my-4" v-for="atelier in [choix.atelier1, choix.atelier2]" :key="atelier?.id">
      <UButton variant="ghost" class="w-full">
        <div class="flex flex-row items-center justify-start w-full gap-2">
          <UIcon name="i-lucide-chevron-down" />
          <span>{{ atelier?.titre }}</span>
        </div>
      </UButton>
      <template #content>
        <MDC :value="atelier?.description || ''" />
      </template>
    </UCollapsible>
  </div>
</template>

<script lang="ts" setup>
type LangueAvecAteliers = Langue & {
  atelier1: Atelier | null
  atelier2: Atelier | null
}


defineProps<{
  choix: LangueAvecAteliers,
}>()
</script>

<style scoped></style>