<script setup lang="ts">
const props = defineProps<{
  icon?: string
  filename?: string
}>()

const config = {
  'package.json': 'vscode-icons:file-type-node',
  'tsconfig.json': 'vscode-icons:file-type-tsconfig',
  '.npmrc': 'vscode-icons:file-type-npm',
  '.editorconfig': 'vscode-icons:file-type-editorconfig',
  '.eslintrc': 'vscode-icons:file-type-eslint',
  '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
  '.eslintignore': 'vscode-icons:file-type-eslint',
  '.gitignore': 'vscode-icons:file-type-git',
  'yarn.lock': 'vscode-icons:file-type-yarn',
  '.env': 'vscode-icons:file-type-dotenv',
  '.env.example': 'vscode-icons:file-type-dotenv',
  '.vscode/settings.json': 'vscode-icons:file-type-vscode',
  '.nuxtrc': 'vscode-icons:file-type-nuxt',
  '.nuxtignore': 'vscode-icons:file-type-nuxt',
  'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
  'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
  ts: 'vscode-icons:file-type-typescript',
  tsx: 'vscode-icons:file-type-typescript',
  mjs: 'vscode-icons:file-type-js',
  cjs: 'vscode-icons:file-type-js',
  js: 'vscode-icons:file-type-js',
  jsx: 'vscode-icons:file-type-js',
  md: 'vscode-icons:file-type-markdown',
  ico: 'vscode-icons:file-type-favicon',
  npm: 'vscode-icons:file-type-npm',
  pnpm: 'vscode-icons:file-type-pnpm',
  npx: 'vscode-icons:file-type-npm',
  yarn: 'vscode-icons:file-type-yarn',
  bun: 'vscode-icons:file-type-bun',
  yml: 'vscode-icons:file-type-yaml',
  terminal: 'i-heroicons-command-line',
  py: 'vscode-icons:file-type-python'
}

const { ui } = useUI('content.prose.code.icon', undefined, config, undefined, true)

const extension = computed(() => (props.filename?.split('.').pop() || '').toLowerCase())
const hasIcon = computed(() => props.icon || ui.value[extension.value] || props.filename.includes('.'))
const icon = computed(() => props.icon ?? (props.filename && (ui.value[props.filename.split('/').pop()] ?? ui.value[extension.value] ?? `vscode-icons:file-type-${extension.value}`)))
</script>

<template>
  <Icon v-if="hasIcon" :name="icon.split(' ').pop()" />
</template>