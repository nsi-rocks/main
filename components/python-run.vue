<template>
  <div class="grid grid-cols-2 gap-4 px-4">
    <codemirror v-model="script" :extensions="[python()]" :style="{ height: '400px' }" />
    <div class="ring-1 ring-primary-500 rounded-lg p-4 whitespace-pre-line">
      {{ resultat }}
    </div>
  </div>
  <UButton @click="runPython" label="run" class="block mx-auto mt-4" />
  <UButton @click="runPython2" label="run2" class="block mx-auto mt-4" />
</template>

<script setup>
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
const script = ref();
const resultat = ref("");
const runPython = async () => {
  const data = await $fetch("https://api.nicolas.zone/python", {
    method: "post",
    body: { script: script.value },
  });
  if (data['traceback']) {
      resultat.value = data['traceback']
  } else {
    resultat.value = data;
  }
};

const runPython2 = async () => {
  const data = await $fetch("https://api.nicolas.zone/python2", {
      method: "post",
    credentials: 'include',
    body: { script: script.value },
  });
  if (data['traceback']) {
      resultat.value = data['traceback']
  } else {
    resultat.value = data;
  }
};
</script>
