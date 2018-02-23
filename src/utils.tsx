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
    minute: '2-digit',
    timeZoneName: 'short'
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

const sortSchemaKeys = (keys: string[]) =>
  keys.sort((a, b) => {
    a = a.toLowerCase()
    b = b.toLowerCase()

    if (a.startsWith('auto')) {
      return -1
    } else if (b.startsWith('auto')) {
      return 1
    } else if (a.startsWith('teleop')) {
      return -1
    } else if (b.startsWith('teleop')) {
      return 1
    }

    return -1
  })

const formatMatchId = (matchId: string): string => {
  const id = matchId.toUpperCase()
  const endNumber = /[\D]*([\d]*)$/.exec(id)[1]
  const group = /^[\D]*([\d]*)/.exec(id)[1]
  if (id.startsWith('QM')) {
    return `Qual ${endNumber}`
  } else if (id.startsWith('QF')) {
    return `Quarter Final ${group} Match ${endNumber}`
  } else if (id.startsWith('SF')) {
    return `Semi Final ${group} Match ${endNumber}`
  } else if (id.startsWith('F')) {
    return `Final ${group} Match ${endNumber}`
  }
  return id
}

const today = Number(new Date())

const sortEvents = (events: FRCEvent[]) =>
  events !== undefined && events !== null
    ? events
        .map(e => {
          e.parsedDate = new Date(e.date)
          e.distanceFromToday = Math.abs(Number(e.parsedDate) - today)
          return e
        })
        .sort((a, b) => (a.distanceFromToday > b.distanceFromToday ? 1 : -1))
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

const eventTypeName = (eventType: number) => eventTypeNames.get(eventType)

const abbreviate = (str: string) =>
  str
    .split(' ')
    .map(v => v[0].toUpperCase())
    .join('')

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
  sortTeams
}
