export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { eleve, message } = body
  const res = await useDrizzle()
    .insert(tables.help)
    .values({
      eleve,
      message,
    })
    .returning()
  return res[0]
})
