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
          <article class="xl:w-2/3 mx-auto mb-8">
            <h1>{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
          </article>
        </UPageBody>
        <template #right>
          <UContentToc :links="doc.body.toc.links" />
        </template>
      </UPage>
    </template>
  </ContentDoc>
</template>
