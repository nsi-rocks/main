export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getUserSession(event)
  const logId = async (hash: string) => {
    const userId = session?.user?.id
    if (!userId) return
    const key = `rgb:user:${userId}`
    if (await hubKV().has(key)) {
      const data: string[] = (await hubKV().get(key)) || ['']
      if (data.includes(hash)) return
      else data.push(hash)
      await hubKV().set(key, data)
    }
    else await hubKV().set(key, [hash])
  }

  let slash = -4
  let caniset = false
  let alreadythere = false
  while (!caniset && !alreadythere) {
    const val = await hubKV().get(`rgb:${body.hash.slice(slash)}`)
    if (JSON.stringify(val) === JSON.stringify(body.data)) {
      alreadythere = true
      await logId(body.hash.slice(slash))
      return body.hash.slice(slash)
    }
    else if (val === null) {
      caniset = true
      await hubKV().set(`rgb:${body.hash.slice(slash)}`, body.data)
      await logId(body.hash.slice(slash))
      return body.hash.slice(slash)
    }
    else {
      slash--
    }
  }
})
