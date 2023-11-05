<template>
  <UTable v-if="test" :rows="test" :columns="cols" :ui="{ td: 'whitespace-pre-wrap'}">
  <template #capacites-data="{ row }">
  <div class="whitespace-normal break-normal"><MDC :value="row.capacites" /></div>
  </template>
  <template #contenu-data="{ row }">
  <div class="whitespace-normal break-normal"><MDC :value="row.contenu" /></div>
  </template>
  </UTable>

  <UPageGrid v-if="test">
  <UPageCard :ui="{}" v-for="p of bo.body" :key="p.id" :title="p.label" to="carto">
  </UPageCard>
  </UPageGrid>
</template>

<script lang="ts" setup>
const bo = await queryContent('/nsi/bosnt').findOne()
const test = bo.body.flatMap(el => el.items)

const cols = [{
  key: 'capacites',
  label: 'Capacités'
}, {
  key: 'contenu',
  label: 'Contenu'
}]
</script>

<style>

</style>

