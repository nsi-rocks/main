const messages = {
  success: { title: 'Ajouté', description: 'L\'image a bien été ajoutée à votre liste.', color: 'success' },
  successNew: { title: 'Nouvelle liste', description: 'L\'image a bien été ajoutée à votre nouvelle liste.', color: 'success' },
  already: { title: 'Déjà présent', description: 'Cette image est déjà présente dans votre liste.', color: 'warning' },
  notLogged: { title: 'Non connecté', description: 'Vous devez être connecté pour ajouter une image à votre liste.', color: 'error' },
  error: { title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'image à votre liste.', color: 'error' },
  badRequest: { title: 'Mauvaise requête', description: 'La requête est incorrecte.', color: 'error' },
}

export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash')

  if (!hash || !await hubKV().has(`rgb:${hash}`)) {
    setResponseStatus(event, 400, 'Bad request')
    return messages.badRequest
  }

  const session = await getUserSession(event)
  const logId = async (hash: string) => {
    const userId = import.meta.dev ? '4ff19728-94d0-46de-a4b6-49308cf81803' : session?.user?.id

    if (userId) {
      setResponseStatus(event, 401, 'Unauthorized')
      return messages.notLogged
    }
    const key = `rgb:user:${userId}`
    if (await hubKV().has(key)) {
      const data: string[] = (await hubKV().get(key)) || ['']
      if (data.includes(hash)) return messages.already
      else data.push(hash)
      await hubKV().set(key, data)
      return messages.success
    }
    else await hubKV().set(key, [hash])
    return messages.successNew
  }

  return logId(hash)
})
