<template>
  <div>
    <div
      v-for="s in data.sections"
      :key="s.titre"
    >
      <ProseH2>{{ s.titre }}</ProseH2>
      <MDC :value="s.introduction" />
    </div>
    <div
      v-for="(s, i) in data.elements"
      :key="i"
    >
      <ProseH2>{{ s.titre }}</ProseH2>
      <MDC :value="s.introduction" />
      <MDC :value="jsonToMarkdownTable(s.items)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = await $fetch('/data/seconde.json')

function jsonToMarkdownTable(items) {
  if (!items.length) return ''

  const headers = Object.keys(items[0])
  const headerRow = '| ' + headers.join(' | ') + ' |'
  const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |'

  const rows = items.map(item =>
    '| ' + headers.map(h => (item[h] ?? '').replace(/\n/g, ' ')).join(' | ') + ' |',
  )

  return [headerRow, separatorRow, ...rows].join('\n')
}
</script>

<style scoped>

</style>
