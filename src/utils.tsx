import FRCEvent from './models/frc-event'
import UserInfo from './models/user-info'

const hasValidJWT = (): boolean => {
  const jwt = getJWT()
  if (!jwt) {
    return false
  }

  const parts = jwt.split('.')
  if (parts.length !== 3) {
    return false
  }

  return JSON.parse(atob(parts[1])).exp > Number(new Date()) / 1000
}

const getJWT = (): string => {
  return localStorage.getItem('jwt')
}

const getUserInfo = (): UserInfo => {
  const body = JSON.parse(atob(getJWT().split('.')[1]))

  return {
    username: body.sub,
    isAdmin: body.pigmice_is_admin
  }
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
  const [, num, letter] = formatTeamNumber(teamId).match(/([0-9]*)(.*)/)
  return { num: Number(num), letter }
}

const sortTeams = (a: string, b: string) =>
  parseTeamNumber(a).num > parseTeamNumber(b).num

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
    { auto: [], teleop: [], general: [] }
  )

const formatMatchId = (matchId: string): string => {
  const id = matchId.toUpperCase()
  const endNumber = /[\D]*([\d]*)$/.exec(id)[1]
  const group = /^[\D]*([\d]*)/.exec(id)[1]
  if (id.startsWith('QM')) {
    return `Qual ${endNumber}`
  } else if (id.startsWith('QF')) {
    return `QF${group} M${endNumber}`
  } else if (id.startsWith('SF')) {
    return `SF${group} M${endNumber}`
  } else if (id.startsWith('F')) {
    return `F${group} M${endNumber}`
  }
  return id
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

const sortEvents = (
  events: FRCEvent[],
  coords?: { lat: number; long: number }
) =>
  events !== undefined && events !== null
    ? events
        .map(e => {
          e.parsedDate = new Date(e.date)
          e.parsedEndDate = new Date(e.endDate)
          e.distanceFromToday = Math.round(
            (Number(e.parsedEndDate) - today) / 1000 / 60 / 60 / 24 / 7
          )

          if (coords !== undefined) {
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

const sortReporterStats = (stats: { reporter: string; reports: Number }[]) =>
  stats !== undefined && stats !== null
    ? stats.sort((a, b) => (a.reports < b.reports ? 1 : -1))
    : []

const parseMatchKey = (name: string) => {
  const [, eventKey, matchKey] = name.match(/([^_]*)_(.*)/)
  return { eventKey, matchKey }
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

const parseMatch = (
  key: string
): {
  type: String
  n: number
  m: number
} => {
  const r = /.+_([a-zA-Z]+)(\d+)m?(\d+)?/gm
  const [, type, n, m] = r.exec(key)
  return { type, n: Number.parseInt(n), m: Number.parseInt(m) }
}

const lerper = (a: number, b: number, c: number, d: number) => (
  x: number
): number => lerp(x, a, b, c, d)

const lerp = (x: number, a: number, b: number, c: number, d: number): number =>
  (x - a) / (b - a) * (d - c) + c

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
  formatMatchId,
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
  sortTeams,
  getCoords,
  capitalize,
  getNumber,
  parseMatch,
  lerp,
  lerper
}
