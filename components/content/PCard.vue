<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  },
  iconClass: {
    type: String,
    default: ''
  },
  blurry: {
    type: Boolean,
    default: true,
    required: false
  }
})
</script>

<template>
  <div :class="{ blurry }" class="card">
    <Icon v-if="icon" :name="icon" />
    <slot />
    <div>
      <h3 class="title" v-if="$slots.title">
        <ContentSlot :use="$slots.title" unwrap="p">
          Card title
        </ContentSlot>
      </h3>
      <div class="description" v-if="$slots.description">
        <ContentSlot :use="$slots.description">
          Card description
        </ContentSlot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.card': {
    display: 'block',
    position: 'relative',
    width: '100%',
    padding: '{space.8}',
    borderRadius: '{radii.xl}',
    border: '1px solid {elements.border.primary.default}',
    background: '{elements.backdrop.background}',
    '@dark': {
      color: '{color.gray.50}'
    },
    '&.blurry': {
      backdropFilter: '{elements.backdrop.filter}',
    },
    '.icon': {
      display: 'inline-block',
      marginBottom: '{space.2}',
      width: '{space.6}',
      height: '{space.6}'
    },
    '.title': {
      marginBottom: '{space.2}',
      fontSize: '{text.lg.fontSize}',
      lineHeight: '{text.lg.lineHeight}',
      fontWeight: '{fontWeight.semibold}'
    },
    '.description': {
      fontSize: '{text.sm.fontSize}',
      lineHeight: '{text.sm.lineHeight}',
      fontWeight: '{fontWeight.medium}',
      color: '{elements.color.text.secondary}'
    }
  }
})
</style>
