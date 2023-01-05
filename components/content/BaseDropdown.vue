<template>

</template>
<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
    description: 'Dropdown html tag (e.g div, ul etc)'
  },
  titleTag: {
    type: String,
    default: 'button',
    description: 'Dropdown title (toggle) html tag'
  },
  title: {
    type: String,
    description: 'Dropdown title'
  },
  direction: {
    type: String,
    default: 'down', // up | down
    description: 'Dropdown menu direction (up|down)'
  },
  icon: {
    type: String,
    description: 'Dropdown icon'
  },
  titleClasses: {
    type: [String, Object, Array],
    description: 'Title css classes'
  },
  menuClasses: {
    type: [String, Object],
    description: 'Menu css classes'
  },
  menuOnRight: {
    type: Boolean,
    description: 'Whether menu should appear on the right'
  }
})

const emit = defineEmits(['change'])
let isOpen = false
const toggleDropDown = () => {
  isOpen = !isOpen;
  emit('change', isOpen);
}
const closeDropDown = () => {
  isOpen = false;
  emit('change', false);
}
</script>

<style scoped>
.dropdown {
  cursor: pointer;
  user-select: none;
}

.btn {
  padding: 1rem;
  background-color: green;
  border-radius: 5px;
}
</style>
