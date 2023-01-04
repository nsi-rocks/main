<template>
  <div>
    <button @click="download('hello.txt','This is the content of my file :)');">Click</button>
  </div>
</template>

<script setup>
function download(filename, text) {
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