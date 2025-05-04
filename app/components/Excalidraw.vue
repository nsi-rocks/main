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
const props = withDefaults(defineProps<{
  data: any
  darkMode?: boolean
}>(), {
  darkMode: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const latestElements = ref<any[]>([])
const latestAppState = ref<any>({})

const throttledEmit = useThrottleFn(() => {
  emit('update:modelValue', {
    elements: latestElements.value,
    appState: latestAppState.value,
  })
}, 500)

const loading = ref(true)
const container = ref<HTMLElement | null>(null)
let reactRoot = null

async function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
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

function mountExcalidraw(data: any, theme: string) {
  const React = (window as any).React
  const ReactDOM = (window as any).ReactDOM
  const { Excalidraw } = (window as any).ExcalidrawLib

  // si on avait déjà monté un Excalidraw, on le démonte d'abord
  if (reactRoot) {
    reactRoot.unmount()
  }

  reactRoot = ReactDOM.createRoot(container.value!)
  reactRoot.render(
    React.createElement(Excalidraw, {
      initialData: data,
      theme,
      onChange: (elements: any[], appState: any) => {
        latestElements.value = elements
        latestAppState.value = appState
        throttledEmit()
      },
      UIOptions: { welcomeScreen: false },
    }),
  )
}

onMounted(async () => {
  try {
    await loadDependencies()
    await nextTick()
    mountExcalidraw(props.data, props.darkMode ? 'dark' : 'light')
  }
  catch (err) {
    console.error(err)
  }
  finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})

watch(() => props.darkMode, (dark) => {
  mountExcalidraw(props.data, dark ? 'dark' : 'light')
})
</script>
