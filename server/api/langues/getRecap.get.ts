export default defineEventHandler(async (event) => {
  const votes = await useDrizzle().select().from(tables.langues).leftJoin(tables.users, eq(tables.langues.userId, tables.users.id))
  const ateliers = await useDrizzle().select().from(tables.ateliers)

  const res: string[] = []
  ateliers.forEach((a) => {
    res.push(`## ${a.titre}`)
    a.jours.forEach((j) => {
      const votesJ = votes.filter(v => (v.langues.assignJ1atelier === a.id && v.langues.assignJ1jour === j) || (v.langues.assignJ2atelier === a.id && v.langues.assignJ2jour === j))
      const jour = ['Lundi', 'Mardi', 'Jeudi', 'Vendredi'][j - 1]
      res.push(`### ${a.titre} - ${jour} (${votesJ.length} élèves)`)
      votesJ.forEach((v) => {
        const user = v.users
        res.push(`- ${user.firstName} ${user.lastName} - ${JSON.parse(user.classes)[0]}`)
      })
      res.push('\n')
    })
  })

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return res.join('\n')
})
