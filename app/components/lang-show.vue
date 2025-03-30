<template>
  <div class="flex flex-col items-center justify-center w-2/3">
    <UPageCard class="w-full" title="Vous avez voté !" spotlight highlight>
      <template #description>
        <ProseP>Vous n'avez plus aucune action à réaliser pour votre inscription aux ateliers de la semaine des langues.
        </ProseP>
        <ProseP>Vous pouvez consulter vos choix ci-dessous.</ProseP>
        <LangChoices :choix="props.vote" class="w-full" />
      </template>
      <template #footer>
        <div class="flex flex-row items-center justify-around w-full">
          <UButton variant="outline" color="warning" @click="resetChoice">
            Modifier mes choix
          </UButton>
          <UButton variant="solid" @click="logout">
            Se déconnecter
          </UButton>
        </div>
      </template>
    </UPageCard>
  </div>
</template>

<script lang="ts" setup>
import { LazyLangConfirmReset } from '#components';

type LangueAvecAteliers = Langue & {
  atelier1: Atelier | null
  atelier2: Atelier | null
}

const props = defineProps<{
  vote: LangueAvecAteliers
}>()
const emit = defineEmits<{
  (e: 'voteAgain'): void
}>()
const store = useStore()
const overlay = useOverlay()

const logout = async () => {
  store.session.clear()
  await navigateTo('https://langues.nsi.rocks')
}

const modal = overlay.create(LazyLangConfirmReset)

async function resetChoice() {
  const isReset = await modal.open()

  if (isReset) {
    // Reset the choice
    await $fetch('/api/langues', {
      method: 'PATCH',
      body: {
        toReset: true
      }
    })
    emit('voteAgain')
    return
  } else {
    // Do nothing
  }
}
</script>

<style scoped></style>