import FRCEvent from './models/frc-event'
import Match from './models/match'
import Analysis from './models/analysis'
import Schema from './models/schema'
import UserInfo from './models/user-info'

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
    headers: hasValidJWT()
      ? new Headers({ Authentication: `Bearer ${getJWT()}` })
      : undefined
  })

const get = <T extends {}>(url: string) => async (
  cb: (err: Error | null, data: T | null) => any
) => {
  cb(null, JSON.parse(localStorage.getItem(url)) || undefined)
  try {
    const data = await queryAPI(url).then(d => d.json())
    cb(null, data)
    localStorage.setItem(url, JSON.stringify(data))
  } catch (ex) {
    cb(ex, undefined)
  }
}

const getEvents = () => get<FRCEvent[]>('events')

const getEvent = (eventKey: string) => get<FRCEvent>(`events/${eventKey}`)

const getEventAnalysis = (eventKey: string) =>
  get<Analysis[]>(`analysis/${eventKey}`)

const getMatch = (eventKey: string, matchKey: string) =>
  get<Match>(`events/${eventKey}/${eventKey}_${matchKey}`)

const getSchema = () => get<Schema>('schema')

const getReporterStats = () =>
  get<{ reporter: string; reports: Number }[]>('leaderboard')

const getUsers = () => get<UserInfo[]>('users')

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
) => get<Analysis[]>(`analysis/${eventKey}/${eventKey}_${matchKey}/${color}`)

const deleteUser = (username: string) => queryAPI(`users/${username}`, 'DELETE')

const updateUser = (username: string, user: UserInfo & { password?: string }) =>
  queryAPI(`users/${username}`, 'PUT', user)

const createUser = (user: UserInfo & { password: string }) =>
  queryAPI(`users`, 'POST', user)

export {
  getEvents,
  getEvent,
  getEventAnalysis,
  getMatch,
  getAllianceAnalysis,
  getSchema,
  getReporterStats,
  getUsers,
  deleteUser,
  authenticate,
  submitReport,
  updateUser,
  createUser
}
