<template>
  <MDCRenderer :body="ast.body" :data="ast.data"/>
</template>

<script setup>
const slots = useSlots();
const def = slots.default();
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const ast = await parseMarkdown(def[0].children)
</script>

<style>
.prose p a {
  text-decoration: underline dotted;
  text-underline-offset: 4px;
}
</style>