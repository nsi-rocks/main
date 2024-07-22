<script setup lang="ts">
const { page, navigation } = useContent();


const query = useRoute().query;
const ldata = computed(() => {
  return Object.keys(query).includes("print") ? "print" : "dashboard";
});

setPageLayout(ldata.value);

definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout :name="ldata">
    <ContentDoc />
  </NuxtLayout>
</template>
