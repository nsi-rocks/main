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
  <div class="ring-1 rounded-lg p-2">
    <Icon v-if="icon" :name="icon" />
    <slot />
    <div>
      <h3 class="m-0" v-if="$slots.title">
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