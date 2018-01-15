import FRCEvent from './models/frc-event'
import Match from './models/match'
import Analysis from './models/analysis'
import Schema from './models/schema'

import { hasValidJWT, getJWT } from './utils'

const endpoint = 'https://api.pigmice.ga'

const queryAPI = (
  path: string,
  method: string = 'GET',
  body?: any
): Promise<any> =>
  fetch(`${endpoint}/${path}`, {
    method,
    body: JSON.stringify(body),
    headers:
      hasValidJWT() && method !== 'GET'
        ? new Headers({ Authentication: `Bearer ${getJWT()}` })
        : undefined
  })

const get = async (url: string, useCache: boolean = true) => {
  if (useCache) {
    let cached = JSON.parse(localStorage.getItem(url))

    if (!cached || Date.now() / 1000 > cached.expires) {
      const resp = await queryAPI(url)

      const cacheControl = /.*max-age=(\d+).*/.exec(
        resp.headers.get('cache-control')
      )

      const maxAge = cacheControl.length >= 2 ? Number(cacheControl[1]) : 3 * 60 // default to 3 minute cache

      cached = {
        expires: Math.round(Date.now() / 1000) + maxAge,
        data: await resp.json()
      }

      localStorage.setItem(url, JSON.stringify(cached))
    }

    return cached.data
  } else {
    return queryAPI(url).then(d => d.json())
  }
}

const getEvents = (): Promise<FRCEvent[]> => get('events')

const getEvent = (eventKey: string): Promise<FRCEvent> =>
  get(`events/${eventKey}`)

const getEventAnalysis = (eventKey: string): Promise<Analysis[]> =>
  get(`analysis/${eventKey}`, false)

const getMatch = (eventKey: string, matchKey: string): Promise<Match> =>
  get(`events/${eventKey}/${eventKey}_${matchKey}`)

const getSchema = (): Promise<Schema> => get('schema')

const authenticate = (credentials: {
  username: string
  password: string
}): Promise<string> =>
  queryAPI('authenticate', 'POST', credentials).then(async resp => {
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error(resp.statusText)
    }
    return (await resp.json()).jwt
  })

const submitReport = (
  team: string,
  eventKey: string,
  matchKey: string,
  stats: { [key: string]: boolean | number }
) =>
  queryAPI(`reports/${eventKey}/${eventKey}_${matchKey}`, 'PUT', {
    team,
    stats
  })

const getAllianceAnalysis = (
  eventKey: string,
  matchKey: string,
  color: string
): Promise<Analysis[]> =>
  get(`analysis/${eventKey}/${eventKey}_${matchKey}/${color}`, false)

export {
  getEvents,
  getEvent,
  getEventAnalysis,
  getMatch,
  getAllianceAnalysis,
  getSchema,
  authenticate,
  submitReport
}
