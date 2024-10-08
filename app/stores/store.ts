export const useStore = defineStore('store', () => {
  const progData = ref()
  const session = useUserSession()

  const isAdmin = computed(() => {
    return (session.user.value != null && session.user.value.teacher === true)
  })

  const getProgression = async (matiere: string) => {
    const res = await $fetch(`/api/progression/${matiere}`)
    progData.value = res
    return res
  }

  const deleteSe = async (seance: Seance | Sequence, type: TypeSe) => {
    progData.value = await $fetch(`/api/progression/se`, {
      method: 'DELETE',
      body: {
        ...seance,
        type: type,
      } })
  }

  const updateSe = async (seance: Seance | Sequence) => {
    const isSeance = 'sequence' in seance
    progData.value = await $fetch(`/api/progression/se`, {
      method: 'PATCH',
      body: {
        ...seance,
        type: isSeance ? 'seance' : 'sequence',
      } })
    return seance
  }

  return { progData, session, isAdmin, getProgression, updateSe, deleteSe }
})
