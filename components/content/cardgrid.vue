<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
const config = {
  wrapper: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
}

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  ui?: Partial<typeof config>
  class?: any
}>()

const { ui, attrs } = useUI('page.grid', toRef(props, 'ui'), config, toRef(props, 'class'), true)
</script>