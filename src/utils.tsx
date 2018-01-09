import FRCEvent from './models/frc-event'

const hasValidJWT = () => {
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

const getJWT = () => {
  return localStorage.getItem('jwt')
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

const formatTeamNumber = (teamId: string): string => teamId.replace('frc', '')

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
  events
    .map(e => {
      e.parsedDate = new Date(e.date)
      e.distanceFromToday = Math.abs(Number(e.parsedDate) - today)
      return e
    })
    .sort((a, b) => (a.distanceFromToday > b.distanceFromToday ? 1 : -1))

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
  [5, 'DCPD'],
  [2, 'DCP'],
  [3, 'CPD'],
  [4, 'CPF'],
  [6, ''],
  [99, 'Off'],
  [100, 'Pre'],
  [-1, '--']
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
  formatTeamNumber,
  formatMatchId,
  sortEvents,
  formatDate,
  formatTime,
  parseMatchKey,
  camelToTitle,
  toPercentage,
  toPrettyNumber,
  eventTypeName,
  abbreviate
}
