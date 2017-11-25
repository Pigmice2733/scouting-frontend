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

export { formatTeamNumber, formatMatchId }
