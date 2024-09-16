<template>
  <ClientOnly>
    <figure>
      <img :src="`/${ld_src}`" style="margin: auto;">
      <figcaption style="text-align: center;">
        <slot />
      </figcaption>
    </figure>
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: String,
})

const c = useColorMode()
const ld_src = computed(() => c.value === 'dark' ? props.src!.replace('.png', '-d.png') : props.src)
</script>

<style>

</style>
