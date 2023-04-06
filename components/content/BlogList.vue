<script setup>
const queryArticles = queryContent('articles').where({ publish: 'yes' }).sort({ ordre: -1 })
const articles = await queryArticles.find()
</script>

<template>
  <blog-card v-for="article in articles" :key="article._file" :article="article" />
</template>

<style scoped>

</style>