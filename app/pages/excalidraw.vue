<template>
  <div class="w-full h-[calc(100vh-4rem)]">
    <Excalidraw
      v-if="data"
      :data="data"
      :dark-mode="colorMode.value === 'dark'"
      @update:model-value="updateData($event)"
    />
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const url = 'https://raw.githubusercontent.com/haydenull/slidev-addon-excalidraw/refs/heads/main/public/example.excalidraw.json'

const data = ref<any>((await fetch(url)).json())

const updateData = (newData: any) => {
  data.value = newData
}
</script>

<style scoped>

</style>
