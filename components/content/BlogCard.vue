<script setup>
defineProps(['article'])
</script>

<template>
  <nuxt-link :to="article._path" class="blog-card">
    <div class="bcard-header">
      <div style="display: flex; flex-direction: column;">
        <h1 style="font-size: 1.5rem; font-weight: 600;">
          {{ article.title }}
        </h1>
        <em style="font-size: 0.8rem;">{{ article.date }}</em>
      </div>
      <div style="display: none; flex-direction: row;">
        <span v-for="tag in article.metags" :key="tag" style="padding: 0.5rem;">{{ tag }}</span>
      </div>
    </div>
    <p>{{ article.description }}</p>
  </nuxt-link>
</template>

<style scoped>
.blog-card {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.blog-card:hover {
  border: 1px solid rgba(0, 160, 0, 0.4);
  box-shadow: 0 0 10px rgba(0, 160, 0, 0.6);
}

.bcard-header {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) { flex-direction: row; }
  justify-content: space-between;
}
</style>