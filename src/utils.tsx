import FRCEvent from './models/frc-event'

const formatTime = (date: Date): string =>
  date.toLocaleTimeString(undefined, {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

const formatTeamNumber = (teamId: string): string =>
  teamId.replace('frc', '')

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

export {
  formatTeamNumber,
  formatMatchId,
  sortEvents,
  formatTime,
  parseMatchKey
}
