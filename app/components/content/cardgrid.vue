<template>
  <div :class="ui.wrapper+' grid-cols-'+cols" v-bind="attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  ui?: Partial<typeof config>
  cols: number
  class?: any
}>()

const config = {
  wrapper: `grid gap-8`,
}

const { ui, attrs } = useUI('page.grid', toRef(props, 'ui'), config, toRef(props, 'class'), true)
</script>
