<script setup lang="ts">
const modal = useModal()
defineProps<{
  nav: string
  version: string
}>()
</script>

<template>
  <UModal :title="`Problème de compatibilité détecté`">
    <template #body>
      <UAlert variant="subtle">
        <template #title>
          Vous utilisez actuellement le navigateur <ProseStrong>{{ nav }}, version {{ version }}</ProseStrong>.
        </template>
      </UAlert>
      <ProseP>
        Ce site utilise la version 4 de <ProseA href="https://tailwindcss.com/docs/compatibility#browser-support">
          Tailwind CSS
        </ProseA>, dont l'affichage est optimal à partir des navigateurs suivants :
        <ProseUl>
          <ProseLi>Chrome 111+ (sorti en Mars 2023)</ProseLi>
          <ProseLi>Safari 16.4+ (sorti en Mars 2023)</ProseLi>
          <ProseLi>Firefox 128+ (sorti en Juillet 2024)</ProseLi>
        </ProseUl>
      </ProseP>
      <ProseP>
        Vous pouvez continuer à utiliser ce navigateur, mais si vous rencontrez des problèmes d'affichage ou si des fonctionnalités sont absentes, vous pouvez, au choix :
        <ProseUl>
          <ProseLi>d'utiliser un autre navigateur</ProseLi>
          <ProseLi>de mettre {{ nav }} à jour</ProseLi>
        </ProseUl>
      </ProseP>
      <div class="flex justify-center mt-8">
        <UButton
          variant="solid"
          @click="modal.close"
        >
          Fermer
        </UButton>
      </div>
    </template>
  </UModal>
</template>
