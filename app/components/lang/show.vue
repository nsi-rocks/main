<template>
  <div class="flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/2 m-auto">
    <UPageCard
      class="w-full"
      title="Vous avez voté !"
      variant="subtle"
    >
      <template #description>
        <ProseP>
          Vous n'avez plus aucune action à réaliser pour votre inscription aux ateliers de la semaine des langues.
        </ProseP>
        <ProseP>Vous pouvez consulter vos choix ci-dessous.</ProseP>
        <LangChoices
          :choix="props.vote"
          class="w-full"
        />
        <UCard
          variant="outline"
          class="mt-4"
        >
          <strong>Commentaire : </strong>{{ props.vote.commentaire }}
        </UCard>
      </template>
      <template #footer>
        <div class="flex flex-row items-center justify-around w-full">
          <UButton
            v-if="false"
            class="cursor-pointer"
            variant="outline"
            color="neutral"
            @click="resetChoice"
          >
            Modifier mes choix
          </UButton>
          <UButton
            class="cursor-pointer"
            variant="solid"
            @click="logout"
          >
            Se déconnecter
          </UButton>
        </div>
      </template>
    </UPageCard>
  </div>
</template>

<script lang="ts" setup>
import { LazyLangConfirmReset } from '#components'

const { onLoaded } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    use() {
      return { JSConfetti: window.JSConfetti }
    },

  },
})
onLoaded(({ JSConfetti }) => {
  // using the real API instance
  const confetti = new JSConfetti()
  confetti.addConfetti({
    emojis: [
      '🇫🇷', '🇺🇸', '🇪🇸', '🇩🇪', '🇮🇹', '🇯🇵', '🇨🇳', '🇬🇧', '🇰🇷', '🇧🇷',
      '🇨🇦', '🇦🇺', '🇮🇳', '🇷🇺', '🇲🇽', '❤️', '💖', '🎆', '✨', '⭐',
    ],
    emojiSize: 100,
    confettiNumber: 20,
  })
  confetti.addConfetti({
    emojis: [
      '🇫🇷', '🇺🇸', '🇪🇸', '🇩🇪', '🇮🇹', '🇯🇵', '🇨🇳', '🇬🇧', '🇰🇷', '🇧🇷',
      '🇨🇦', '🇦🇺', '🇮🇳', '🇷🇺', '🇲🇽', '❤️', '💖', '🎆', '✨', '⭐',
    ],
    emojiSize: 40,
    confettiNumber: 100,
  })
})

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
        toReset: true,
      },
    })
    emit('voteAgain')
    return
  }
  else {
    // Do nothing
  }
}
</script>

<style scoped></style>
