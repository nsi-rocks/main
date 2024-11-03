<script setup lang="ts">
</script>

<template>
  <ContentDoc :head="false">
    <template #not-found>
      Oops... La page que vous cherchez n'existe pas.
    </template>
    <template #default="{ doc }">
      <UPage>
        <UPageBody prose class="prose-code:text-base">
          <article class="xl:px-16 mx-auto mb-8">
            <h1>{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
          </article>
        </UPageBody>
        <template #right>
          <UContentToc v-if="doc.body?.toc" :links="doc.body.toc.links" title="Sommaire" />
        </template>
      </UPage>
    </template>
  </ContentDoc>
</template>
