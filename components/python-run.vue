<template>
  <div class="grid grid-cols-2 gap-4 px-4">
    <codemirror ref="cm" v-model="script" basic />
    <div class="ring-1 ring-primary-500 rounded-lg p-4 whitespace-pre-line">
      {{ resultat }}
    </div>
  </div>
  <UButton @click="runPython" label="run" class="block mx-auto mt-4" />
  <UButton @click="runPython2" label="run2" class="block mx-auto mt-4" />
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";

const changeval = (event) => {
    console.log(event);
}



const script = ref("Il était une fois");
const resultat = ref("");
const runPython = async () => {
  const data: any = await $fetch("https://api.nicolas.zone/python", {
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
  const data: any = await $fetch("https://api.nicolas.zone/python2", {
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
