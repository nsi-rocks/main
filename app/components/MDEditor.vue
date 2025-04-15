<template>
  <div>
    <Codemirror
      v-model="code"
      :extensions="extensions"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      style="height: 100%; width: 100%"
      @ready="handleReady"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { Compartment } from '@codemirror/state'
import { basicLight } from 'cm6-theme-basic-light'
import { basicDark } from 'cm6-theme-basic-dark'
import type { EditorView } from '@codemirror/view'
import type { EditorState } from '@codemirror/state'

const p = defineProps<{ theme?: string }>()
const themeCompartment = new Compartment()
const code = defineModel({ type: String, default: '' })
const editorView = shallowRef<EditorView | null>(null)

const colorMode = useColorMode()
const theme = computed(() => {
  if (p.theme) {
    return p.theme
  }
  else {
    return colorMode.value === 'dark' ? 'dark' : 'light'
  }
})

const extensions = [markdown(), themeCompartment.of(theme.value === 'light' ? basicLight : basicDark)]

watch(colorMode, (newMode) => {
  if (!editorView.value) return

  editorView.value.dispatch({
    effects: themeCompartment.reconfigure(
      newMode.value === 'dark' ? basicDark : basicLight,
    ),
  })
})

function handleReady(payload: {
  view: EditorView
  state: EditorState
  container: HTMLDivElement
}) {
  editorView.value = payload.view
}
</script>
