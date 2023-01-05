<template>
  <div class="unicell" :style="{ 'justify-content': jc }">
    <span v-if="gen" class="gen">gén. {{ gen }}</span>
    <span v-for="ccc in rubb" class="cell">{{ ccc }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String
  },
  gen: {
    type: String
  },
  jc: {
    type: String
  }
})

let rubb = []
for(let c of props.code) {
  if(c == '0') {
    rubb.push("□")
  } else {
    rubb.push("■")
  }
}
</script>

<style scoped>
.cell {
  font-size: 2rem;
}

.gen {
  color: red;
  margin-right: 1rem;
}

.unicell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>