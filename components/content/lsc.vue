<template>
  <div @click="checked = !checked" >
  <Icon class="icon" :class="{ 'checked': checked === true }" name="material-symbols:check-circle" />
    <span :class="{ 'done': checked === true }">
      <ContentSlot :use="$slots.default" />
    </span>
  </div>
</template>

<script setup lang="ts">
const checked = ref(false)
</script>

<style scoped>
.icon {
  font-size: 2rem;
  color: gray;
  margin-right: 0.5rem;
  opacity: 30%;
}

.checked {
  color: green;
  opacity: 100%;
}

.done {
  opacity: 30%;
}
</style>