<template>
  <ClientOnly>
    <div class="w-screen mx-auto wrappz flex flex-col">
      <div class="w-full flex flex-row justify-end p-2">
        <div class="flex flex-row items-center gap-4">
          <UColorModeToggle />
          <UserButton redirect-app="md" />
        </div>
      </div>
      <MdEditor
        v-model="content"
        language="fr_FR"
        :toolbars="tbars"
        :theme="$colorMode.value === 'dark' ? 'dark' : 'light'"
        :completions="[]"
      >
        <template #defToolbars>
          <NormalToolbar title="mark" @on-click="handler">
            <template #trigger>
              <UIcon name="ion:share-outline" />
            </template>
          </NormalToolbar>
        </template>
      </MdEditor>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { MdEditor, NormalToolbar, config } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const handler = (e: MouseEvent) => {
  console.log('click', e)
}

config({
  editorConfig: {
    renderDelay: 0,
    languageUserDefined: langz,
  },
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

.wrappz > .md-editor {
  height: calc(100% - 2rem);
  width: 90%;
  margin: auto;
}
.md-editor-resize-operate {
  border-left: 1px solid #e2e8f0;
}

.dark .md-editor-resize-operate {
  border-left: 1px solid #2d3748;
}

.dark .md-editor {
  background-color: rgb(var(--color-gray-800) / var(--tw-bg-opacity));
}

.dark .ͼo {
  background-color: rgb(var(--color-gray-800) / var(--tw-bg-opacity));
}

.dark .md-editor-toolbar-wrapper {
  background-color: rgb(var(--color-gray-900) / var(--tw-bg-opacity));
}

.md-editor-preview .md-editor-admonition {
  background-color: var(--md-admonition-bg-color);
  border: 1px solid var(--md-admonition-color);
  border-radius: 0;
  color: var(--md-admonition-color);
  display: flow-root;
  font-size: 14px;
  font-weight: 400;
  margin: 1rem 0;
  padding: 1em 1em .5em;
  page-break-inside: avoid;
}
</style>
