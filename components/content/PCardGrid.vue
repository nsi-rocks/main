<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Features'
  },
  cols: {
    type: String,
    default: '3'
  }
})
</script>

<template>
  <section class="card-grid">
    <ContentSlot :use="$slots.root" />

    <h2 class="title">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <div class="layout">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="ts">
css({
'.card-grid': {
position: 'relative',
paddingBottom: '{space.2}',
'@sm': {
       paddingBottom: '{space.6}',
     },
'@lg': {
       paddingBottom: '{space.8}',
     },
'.title': {
marginBottom: '{space.8}',
fontSize: '{text.xl.fontSize}',
lineHeight: '{text.xl.lineHeight}',
fontWeight: '{fontWeight.bold}',
letterSpacing: '{letterSpacing.tight}',
color: '{elements.color.text.primary}',
'@sm': {
       fontSize: '{text.2xl.fontSize}',
       lineHeight: '{text.2xl.lineHeight}',
     }
},
'.layout': {
display: 'grid',
gap: '{space.4}',
textAlign: 'left',
color: '{elements.color.text.primary}',
'@sm': {
       gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
     },
'@lg': {
       gridTemplateColumns: 'repeat(v-bind(cols), minmax(0, 1fr))'
     },
'@2xl': {
        gap: '{space.8}'
      }
}
}
})
</style>
