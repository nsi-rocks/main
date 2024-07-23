<script setup lang="ts">
const teams = [{
  label: 'Accueil',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4'
  },
  click: async () => {
    team.value = teams[0]
    await navigateTo('/')
  }
}, {
  label: 'NSI',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4'
  },
  click: async () => {
    team.value = teams[1]
    await navigateTo('/old/nsi')
  }
}, {
  label: 'SNT',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4'
  },
  click: async () => {
    team.value = teams[2]
    await navigateTo('/old/snt')
  }
}]

const actions = [{
  label: 'Create team',
  icon: 'i-heroicons-plus-circle'
}, {
  label: 'Manage teams',
  icon: 'i-heroicons-cog-8-tooth'
}]

const team = useState('team', () => teams[0])
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    :items="[teams, actions]"
  >
    <UButton
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar
        :src="team.avatar.src"
        size="2xs"
      />

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{ team.label }}</span>
    </UButton>
  </UDropdown>
</template>