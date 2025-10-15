<script lang="ts" setup>
const { data: localeNav } = useLocaleNavigation()
</script>

<template>
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <UContentNavigation
              :navigation="localeNav ?? []"
              :collapsible="false"
              highlight
            />
          </UPageAside>
        </template>
        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>

<style></style>
