<template>
  <div @click="checked = !checked" >
  <Icon class="icon" @click="checked = !checked" :class="{ 'checked': checked === true }" name="material-symbols:check-circle" />
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
}

.checked {
  color: green;
}

.done {
  opacity: 30%;
}
</style>