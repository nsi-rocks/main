<template>
  <UTable :rows="test" :columns="cols" :ui="{ td: 'whitespace-pre-wrap'}">
  <template #capacites-data="{ row }">
  <div class="break-all"><MDC :value="row.capacites" /></div>
  </template>
  <template #contenu-data="{ row }">
  <div class="break-all"><MDC :value="row.contenu" /></div>
  </template>
  </UTable>

  <UPageGrid>
  <ULandingCard v-for="p of bo.body" :key="p.id" orientation="horizontal" :title="p.label" description="Cartographie et mobilité" icon="i-heroicons-map" to="carto">
  <img src="https://oniros.fr/CassiniNeuff1759.jpg" />
  </ULandingCard>
  </UPageGrid>
</template>

<script lang="ts" setup>
const bo = await queryContent('/bosnt').findOne()
const test = bo.body.flatMap(el => el.items)

const cols = [{
  key: 'capacites'
}, {
  key: 'contenu'
}]
</script>

<style>

</style>

