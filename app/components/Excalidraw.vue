<template>
  <client-only>
    <div
      v-show="!loading"
      ref="container"
      style="width:100%; height:100%"
    />
  </client-only>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'

const loading = ref(true)
const container = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  drawFilePath: string
  darkMode?: boolean
  background?: boolean
}>(), {
  darkMode: false,
  background: false,
})

async function loadScript(src: string) {
  // bien entourer le sélecteur de guillemets ET utiliser des backticks
  if (document.querySelector(`script[src="${src}"]`)) return

  return new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    // idem, backticks pour la template string
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

async function loadStyle(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return

  return new Promise<void>((resolve, reject) => {
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    l.onload = () => resolve()
    l.onerror = () => reject(new Error(`Failed to load ${href}`))
    document.head.appendChild(l)
  })
}

function loadDependencies() {
  return Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@excalidraw/excalidraw/dist/excalidraw.production.min.js'),
    loadStyle('https://cdn.jsdelivr.net/npm/@excalidraw/excalidraw/dist/excalidraw.min.css'),
  ])
}

onMounted(async () => {
  try {
    // 1) charger React/ReactDOM/Excalidraw
    await loadDependencies()

    // 2) récupérer le JSON
    const url = new URL(props.drawFilePath, window.location.href).href
    const initialData = await (await fetch(url)).json()

    // 3) attendre le rendu du container
    await nextTick()

    // 4) monter Excalidraw
    const React = (window as any).React
    const ReactDOM = (window as any).ReactDOM
    const { Excalidraw } = (window as any).ExcalidrawLib

    const root = ReactDOM.createRoot(container.value!)
    root.render(
      React.createElement(Excalidraw, {
        initialData,
        onChange: (elements: any[], state: any) => {
          console.log('Excalidraw state:', state, elements)
        },
        UIOptions: { welcomeScreen: false },
      }),
    )
  }
  catch (err) {
    console.error(err)
  }
  finally {
    loading.value = false
  }
})
</script>
