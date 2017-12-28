const formatTime = date =>
  date.toLocaleTimeString({
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

const formatTeamNumber = teamId => teamId.replace('frc', '')

const formatMatchId = matchId => {
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

const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000

const sortEvents = events =>
  events
    .map(e => {
      e.date = new Date(e.date)
      return e
    })
    .sort((a, b) => {
      if (a.date > b.date) {
        return b.date > twoDaysAgo ? 1 : -1
      }
      return a.date > twoDaysAgo ? -1 : 1
    })

const parseMatchKey = name => {
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
