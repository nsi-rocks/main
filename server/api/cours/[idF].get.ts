import { init } from '@paralleldrive/cuid2'

const createId = init({
  length: 4,
})

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  await hubKV().set(`api:get:${createId()}`, Date.now(), { ttl: 1800 })
  const apiCalls = await hubKV().keys('api:get')
  if (apiCalls.length >= 100) {
    return createError({ status: 429, message: 'Limite de requêtes pour cette API atteinte. Veuillez rééssayer dans quelques minutes.' })
  }

  const fullD = getRouterParam(event, 'idF')
  if (fullD && !fullD.includes(':')) {
    if ((await hubKV().keys(`cours:${fullD}`)).length > 0) {
      return 'Cette clé existe déjà. Veuillez en choisir une autre, ou ajouter votre clé secrète à la fin de la clé publique. Exemple : /api/cours/formu-toto:F6D8'
    }
    else {
      const secret = createId()
      await hubKV().set(`cours:${fullD}:${secret}`, [])
      await hubKV().set(`cours:${fullD}`, [])
      return `Clé publique : ${fullD}\nClé secrète : ${secret}`
    }
  }
  if (!fullD || !fullD.includes(':'))
    return createError({ status: 400, message: 'Format invalide.' })
  const [idF, sKey] = fullD.split(':')
  const didHandleCors = handleCors(event, {
    origin: '*',
    preflight: {
      statusCode: 204,
    },
    methods: '*',
  })
  if (didHandleCors) {
    return
  }

  if (await hubKV().has(`cours:${idF}:${sKey}`)) {
    const data = await hubKV().get(`cours:${idF}`)
    return data
  }
  else {
    return createError({ status: 404, message: 'Données introuvables ou mauvaise clé secrète.' })
  }
})
