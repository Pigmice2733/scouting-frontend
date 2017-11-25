import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent, getMatch } from '../../api'
import style from './style'
import RobotImage from '../../components/robot-image'
import { formatTeamNumber, formatMatchId } from '../../utils'
import Button from '../../components/button'

const Match = wrap(
  ({ eventId, matchId, data: { event } }) => {
    const url = `/events/${eventId}/${matchId}`
    const match = event
      ? event.matches.find(m => m.key === `${eventId}_${matchId}`)
      : {}
    const eventName = event ? event.name : eventId
    const alliances =
      match.redAlliance && match.blueAlliance
        ? [
            { color: 'red', alliance: match.redAlliance },
            { color: 'blue', alliance: match.blueAlliance }
          ]
        : []
    const time =
      match.actualTime || match.predictedTime
        ? new Date(
            match.actualTime || match.predictedTime
          ).toLocaleTimeString(undefined, {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })
        : 'Loading...'
    return (
      <div class={style.match}>
        <Header
          title={matchId.toUpperCase() + ' - ' + eventName}
          back={'/events/' + eventId}
        />
        <div class={style.matchName}>
          <h2>{formatMatchId(matchId)}</h2>
        </div>
        <div class={style.matchTime}>
          <h2>{time}</h2>
          <Button href={`${url}/scout`}>Scout</Button>
        </div>
        {alliances.map(alliance => (
          <a
            href={`${url}/alliance/${alliance.color}`}
            key={alliance.color}
            class={`${style.alliance} ${style[alliance.color]}`}
          >
            {alliance.alliance.teams.map(team => (
              <RobotImage
                team={formatTeamNumber(team.number)}
                color={alliance.color}
              />
            ))}
            <div class={style.score}>
              <h2>Score</h2>
              <span>{alliance.alliance.score}</span>
            </div>
          </a>
        ))}
      </div>
    )
  },
  ({ eventId, matchId }) => ({
    event: getEvent(eventId)
  })
)

export default Match
