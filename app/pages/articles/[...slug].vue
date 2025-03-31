<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const { data: test } = await useAsyncData(() => queryCollectionNavigation('content', ['description']))

const datest = test.value?.find(el => el.path == '/' + route.path.split('/')[1]) || []
const dada = datest?.children.find((el: any) => el.path == route.path) || []
</script>

<template>
  <UPage>
    <UPageHeader
      v-if="!page.landing"
      :title="page?.title"
      :links="page?.links"
    />
    <UPageBody>
      <ContentRenderer
        v-if="!page.landing"
        :value="page"
      />
      <div v-else>
        <div class="flex flex-row justify-between mb-8">
          <div>
            <ProseH1 class="text-3xl md:text-5xl mb-4 flex items-center gap-4">
              <div class="md:hidden flex items-center">
                <UIcon
                  :name="page.icon"
                  class="h-full m-auto"
                />
              </div>
              <span>{{ page.title }}</span>
            </ProseH1>
            <p>{{ page.description }}</p>
          </div>
          <div class="md:block hidden">
            <UIcon
              :name="page.icon"
              class="sm:m-8 m-0"
              size="90"
            />
          </div>
        </div>

        <UPageList v-if="page.landing && dada?.children">
          <UPageCard
            v-for="el in dada.children"
            :key="el.id"
            variant="subtle"
            orientation="vertical"
            :to="el.path"
            :description="el.description"
            class="rounded-none"
          >
            <template #title>
              <div class="flex items-center">
                <icon
                  name="i-lucide-notebook-text"
                  class="mr-2"
                />
                {{ el.title }}
              </div>
            </template>
          </UPageCard>
        </UPageList>
      </div>
    </UPageBody>
    <template
      v-if="!page?.landing && page?.body?.toc?.links && page?.body?.toc?.links?.length > 0"
      #right
    >
      <UContentToc
        :links="page.body.toc.links"
        title="Sommaire"
      />
    </template>
  </UPage>
</template>
