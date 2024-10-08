export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let slash = -4
  let caniset = false
  let alreadythere = false
  while (!caniset && !alreadythere) {
    const val = await hubKV().get(`rgb:${body.hash.slice(slash)}`)
    if (JSON.stringify(val) === JSON.stringify(body.data)) {
      alreadythere = true
      return body.hash.slice(slash)
    }
    else if (val === null) {
      caniset = true
      await hubKV().set(`rgb:${body.hash.slice(slash)}`, body.data)
      return body.hash.slice(slash)
    }
    else {
      slash--
    }
  }
})
