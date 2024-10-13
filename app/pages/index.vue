<template>
  <UPageBody prose>
    <ContentDoc />

    <div class="flex flex-row flex-wrap w-2/3 mx-auto my-16 gap-2">
      <div
        v-for="i in sum"
        :key="i"
        class="w-8 h-8"
        :class="[periodesAccumulated.findIndex(el => el >= i) % 2 == 0 ? 'bg-blue-400' : 'bg-slate-700', i === semaine ? 'ring-2 ring-offset-2' : '']"
      />
    </div>

    <ClientOnly>
      <div class="w-4/5 mx-auto">
        <MdEditor
          v-model="content"
          language="fr_FR"
          :toolbars="tbars"
          :theme="$colorMode.value === 'dark' ? 'dark' : 'light'"
          :completions="[]"
        >
          <template #defToolbars>
            <NormalToolbar title="mark" @on-click="handler">
              <template #trigger>
                <UIcon name="ion:share-outline" />
              </template>
            </NormalToolbar>
          </template>
        </MdEditor>
      </div>
    </ClientOnly>
  </UPageBody>
</template>

<script lang="ts" setup>
const semaine = 7
const periodes = [7, 2, 7, 2, 5, 2, 6, 2, 6, 2, 5]

const periodesAccumulated = periodes.reduce((acc, el) => {
  acc.push(acc[acc.length - 1]! + el)
  return acc
}, [0]).slice(1)
const sum = ref(0)
periodes.map(el => sum.value += el)
</script>

<style>
.md-editor-resize-operate {
  border-left: 1px solid #e2e8f0;
}

.dark .md-editor-resize-operate {
  border-left: 1px solid #2d3748;
}
</style>
