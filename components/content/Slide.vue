<template>
  <div v-for="sl in slots">
    {{ sl }}
  </div>
  <div>
    count : {{ count }}
  </div>
  <div class="slideshow cursor-pointer">
    <slot :name="slots[count]" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['keyup'])
const count = ref(0)
const slots = Object.keys(useSlots())

const funckey = (e) => {
    emit('keyup', e)
    console.log(e)
    if(e.key === "ArrowRight") {
      count.value++
    } else if(e.key === "ArrowLeft") {
      count.value--
    }
}

onMounted(() => {
    window.addEventListener('keyup', funckey)
})

onBeforeUnmount(() => {
    window.removeEventListener('keyup', funckey)
})

</script>



<style>
.slideshow h1 {
  font-size: 1rem !important;
}

.slideshow {
  width: 100%;
  height: 80vh;
  overflow: scroll;
}

.slideshow > * {
  height: 100%;
}
</style>
