export default defineEventHandler(async (event) => {
  const votes = await useDrizzle().select().from(tables.langues).leftJoin(tables.users, eq(tables.langues.userId, tables.users.id))
  const ateliers = await useDrizzle().select().from(tables.ateliers)

  const classes = votes.map(v => v.users.classes)
  const uniqueClasses = Array.from(new Set(classes.map(c => JSON.parse(c)[0])))
  // console.log('Classes uniques :', uniqueClasses)
  // Classes uniques : [ '2NDE 08','2NDE 07','2NDE 10','2NDE 02','2NDE 11','2NDE 03','2NDE 09','2NDE 05','2NDE 06','2NDE 04','2NDE 01']

  const sortedClasses = uniqueClasses.sort((a, b) => {
    const numA = parseInt(a.split(' ')[1], 10)
    const numB = parseInt(b.split(' ')[1], 10)
    return numA - numB
  })
  console.log('Classes triées :', sortedClasses)

  const res: string[] = []
  sortedClasses.forEach((c) => {
    res.push(`## ${c}`)
    res.push('| Prénom | Nom |  Atelier 1 | Jour 1 | Atelier 2 | Jour 2 |')
    res.push('| --- | --- | --- | --- | --- | --- | --- |')
    votes.filter(el => JSON.parse(el.users.classes)[0] === c).forEach((v) => {
      res.push(`| ${v.users.firstName} | ${v.users.lastName} | ${ateliers.find(el => el.id === v.langues.assignJ1atelier).titre} | ${v.langues.assignJ1jour} | ${ateliers.find(el => el.id === v.langues.assignJ2atelier).titre} | ${v.langues.assignJ2jour} |`)
    })
    res.push('\n')
  })
  res.push('\n')

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return res.join('\n')
})
