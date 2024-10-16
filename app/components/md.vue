<template>
  <div class="w-screen mx-auto wrappz flex flex-col">
    <div class="w-full flex flex-row justify-end p-2">
      <ClientOnly>
        <div class="flex flex-row items-center gap-4">
          <UColorModeToggle />
          <UserButton redirect-app="md" />
        </div>
      </ClientOnly>
    </div>
    <div class="grid grid-cols-2 h-[60vh] w-full px-4 gap-4 m-auto">
      <div ref="editor" class="border overflow-scroll" />
      <div class="prose prose-primary dark:prose-invert max-w-none" v-html="cm_value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState, Compartment } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { languages } from '@codemirror/language-data'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { basicSetup } from 'codemirror'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css',
    },
  ],
})

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

const colorMode = useColorMode()

const test = EditorView.updateListener.of((update) => {
  console.log('update', update)
  cm_value.value = marked.parse(update.state.doc.toString()) as string
})

const editor = ref()
const view = ref()
const editorTheme = new Compartment()

const createEditorState = (isDarkMode: boolean) => {
  const theme = isDarkMode ? oneDark : []
  return EditorState.create({
    doc: 'Hello World',
    extensions: [basicSetup, markdown({ codeLanguages: languages }), editorTheme.of(theme), test, keymap.of([...defaultKeymap, indentWithTab])],
  })
}

const updateTheme = (isDarkMode: boolean) => {
  const theme = isDarkMode ? oneDark : []
  if (editor.value) {
    // Dynamically reconfigure the theme extension properly
    view.value.dispatch({
      effects: editorTheme.reconfigure(theme),
    })
  }
}

const cm_value = ref('tata')

onMounted(() => {
  view.value = new EditorView({
    state: createEditorState(colorMode.value === 'dark'),
    parent: editor.value,
  })
})

watch(colorMode, () => {
  updateTheme(colorMode.value === 'dark')
})

const content = ref(`
# Écrire en markdown

Les admonitions fonctionnent de la même façon que dans les notebooks Capytale :

!!! info Admonition
Contenu de l'admonition, avec du texte en **gras** et en *italique*.
!!!

Ceci est un exemple de contenu en markdown. Il est possible d'insérer des images, par exemple depuis [PixaBay](https://pixabay.com/fr/).

![Image](https://cdn.pixabay.com/photo/2020/07/01/08/17/mother-board-5358842_1280.jpg)

Il est possible d'insérer des formules mathématiques en utilisant le format LaTeX. Par exemple, la formule suivante :

$\\sqrt{3 + 2x}$
`)
</script>

<style>
.wrappz {
  height: calc(100vh - 4rem);
}

.cm-editor {
  height: 100%;
  min-height: 150px;
}
</style>
