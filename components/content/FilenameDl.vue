<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  filename: {
    type: String,
    default: ''
  }
})

const download = (filename, text) => {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.

</script>

<template>
  <span @click="download(filename,props.content);">
    {{ filename }}
  </span>
</template>