import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const field = ref()

  return { field }
})
