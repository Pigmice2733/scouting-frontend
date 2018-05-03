import FRCEvent from './models/frc-event'
import { UserInfo } from './models/user'

const hasValidJWT = (): boolean => {
  const jwt = getJWT()
  if (jwt === null) {
    return false
  }

  const parts = jwt.split('.')
  if (parts.length !== 3) {
    return false
  }

  return JSON.parse(atob(parts[1])).exp > Number(new Date()) / 1000
}

const getJWT = () => {
  return localStorage.getItem('jwt')
}

const getUserInfo = (): UserInfo | null => {
  const jwt = getJWT()
  if (jwt === null) {
    return null
  }
  const body = JSON.parse(atob(jwt.split('.')[1]))

  return {
    username: body.sub,
    isAdmin: body.pigmice_is_admin
  }
}

const matchRegex = (regex: RegExp, str: string, groupNum?: number) => {
  const match = regex.exec(str)
  if (match === null) {
    return null
  }
  if (groupNum !== undefined) {
    return match[groupNum + 1]
  }
  return match[0]
}

const formatTime = (date: Date): string =>
  date.toLocaleTimeString(undefined, {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  })

const formatDate = (date: Date): string =>
  date.toLocaleDateString(undefined, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  })

const formatTeamNumber = (teamId: string) => teamId.replace('frc', '')

const parseTeamNumber = (teamId: string) => {
  const results = formatTeamNumber(teamId).match(/([0-9]*)(.*)/)
  if (results === null) {
    return { num: null, letter: null }
  }
  const [, num, letter] = results
  return { num: Number(num), letter }
}

const compareTeams = (a: string, b: string) => {
  const teamA = parseTeamNumber(a).num
  const teamB = parseTeamNumber(b).num
  if (teamA === null || teamB === null) {
    return 0
  }
  return teamA > teamB ? 1 : -1
}

interface SortedSchemaKeys {
  auto: string[]
  teleop: string[]
  general: string[]
  [key: string]: string[]
}

const sortSchemaKeys = (keys: string[]): SortedSchemaKeys =>
  keys.reduce(
    (acc, val) => {
      if (val.startsWith('auto')) {
        acc.auto.push(val)
      } else if (val.startsWith('teleop')) {
        acc.teleop.push(val)
      } else {
        acc.general.push(val)
      }
      return acc
    },
    { auto: [], teleop: [], general: [] } as {
      auto: string[]
      teleop: string[]
      general: string[]
    }
  )

const formatMatchKey = (matchId: string): string => {
  const { type, num, group } = parseMatchKey(matchId)
  if (type === 'q') {
    return `Qual ${num}`
  }
  return `${type !== null ? type.toUpperCase() : ''}${group} M${num}`
}

const toRadians = (deg: number) => deg * (Math.PI / 180)

/**
 * @returns Distance between the 2 points in km
 * More info at https://www.movable-type.co.uk/scripts/latlong.html
 */
const distanceBetween = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const earthRadius = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadius * angularDistance
}

const getCoords = (cb: (pos: { lat: number; long: number }) => any) => {
  const cachedCoords = localStorage.getItem('coords')
  if (cachedCoords !== null) {
    cb(JSON.parse(cachedCoords))
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const coords = { lat: pos.coords.latitude, long: pos.coords.longitude }
    localStorage.setItem('coords', JSON.stringify(coords))
    cb(coords)
  })
}

const today = Number(new Date())

type FRCEventWithInfo = FRCEvent & {
  parsedDate: Date
  parsedEndDate: Date
  distanceFromToday: number
  distance: number
}

const sortEvents = (
  events: FRCEvent[],
  coords?: { lat: number; long: number }
) =>
  events !== undefined && events !== null
    ? events
        .map((e: FRCEventWithInfo): FRCEventWithInfo => {
          e.parsedDate = new Date(e.date)
          e.parsedEndDate = new Date(e.endDate)
          e.distanceFromToday = Math.round(
            (Number(e.parsedEndDate) - today) / 1000 / 60 / 60 / 24 / 7
          )

          if (coords !== undefined && e.lat && e.long) {
            e.distance = distanceBetween(coords.lat, coords.long, e.lat, e.long)
          }

          return e
        })
        .sort((a, b) => {
          if (a.distanceFromToday === b.distanceFromToday) {
            return a.distance > b.distance ? 1 : -1
          } else if (a.distanceFromToday > b.distanceFromToday) {
            return a.distanceFromToday >= 0 ? 1 : -1
          }
          return a.distanceFromToday >= 0 ? -1 : 1
        })
    : []

const sortReporterStats = (stats: { reporter: string; reports: number }[]) =>
  stats !== undefined && stats !== null
    ? stats.sort((a, b) => (a.reports < b.reports ? 1 : -1))
    : []

const parseMatchKey = (key: string) => {
  const split = key.split('_')
  const eventKey = split[1] ? split[0].toLowerCase() : null
  const matchKey = split[1] ? split[1].toLowerCase() : split[0].toLowerCase()
  const num = matchRegex(/.*m([\d]*)$/, matchKey, 0)
  const g = matchRegex(/^[\D]*([\d]*)m/, matchKey, 0)
  const type = matchRegex(/(^[\D]*).*m.*$/, matchKey, 0)
  return {
    eventKey,
    matchKey,
    group: g === '' || g === null ? null : Number.parseInt(g),
    num: num !== null ? Number.parseInt(num) : null,
    type
  }
}

const camelToTitle = (text: string) => {
  const d = text.replace(/[A-Z]/g, m => ' ' + m)
  return d[0].toUpperCase() + d.slice(1)
}

const toPercentage = (val: number) => Math.round(val * 100) + '%'

const toPrettyNumber = (val: number) => Math.round(val * 10) / 10

const getNumber = (val: number | boolean) =>
  typeof val === 'number' ? val : val ? 1 : 0

const eventTypeNames = new Map<number, string>([
  [0, ''],
  [1, ''],
  [5, 'DCMP'],
  [2, 'DCMP'],
  [3, 'CMP'],
  [4, 'CMP'],
  [6, ''],
  [99, 'Off'],
  [100, 'Pre'],
  [-1, '']
])

const lerper = (
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number
) => (val: number): number => lerp(val, minIn, maxIn, minOut, maxOut)

const lerp = (
  val: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number
): number => (val - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut

const compareMatchKey = (a: string, b: string) => {
  if (a === b) {
    return 0
  }

  const aParsed = parseMatchKey(a)
  const bParsed = parseMatchKey(b)

  if (aParsed.type === bParsed.type) {
    if (aParsed.num === bParsed.num) {
      if (aParsed.group === null || bParsed.group === null) {
        return 0
      }
      return aParsed.group < bParsed.group ? -1 : 1
    }
    if (aParsed.num === null || bParsed.num === null) {
      return 0
    }
    return aParsed.num < bParsed.num ? -1 : 1
  }
  if (aParsed.type === null || bParsed.type === null) {
    return 0
  }
  return compareMatchType(aParsed.type, bParsed.type)
}

const order = ['qm', 'ef', 'qf', 'sf', 'f']

const compareMatchType = (a: string, b: string) =>
  order.indexOf(a) > order.indexOf(b) ? 1 : -1

const eventTypeName = (eventType: number) => eventTypeNames.get(eventType)

const abbreviate = (str: string) =>
  str
    .split(' ')
    .map(v => v[0].toUpperCase())
    .join('')

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

export {
  hasValidJWT,
  getJWT,
  getUserInfo,
  formatTeamNumber,
  formatMatchKey,
  sortEvents,
  formatDate,
  formatTime,
  parseMatchKey,
  camelToTitle,
  toPercentage,
  toPrettyNumber,
  sortReporterStats,
  sortSchemaKeys,
  eventTypeName,
  abbreviate,
  compareTeams,
  getCoords,
  capitalize,
  getNumber,
  lerp,
  lerper,
  compareMatchKey
}
