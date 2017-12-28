import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import Spinner from '../../components/spinner'
import { getEvent, getMatch } from '../../api'
import {
  match as matchClass,
  matchName as matchNameClass,
  matchTime as matchTimeClass,
  alliance as allianceClass,
  blue as blueClass,
  red as redClass,
  score as scoreClass
} from './style'
import RobotImage from '../../components/robot-image'
import { formatTeamNumber, formatMatchId, formatTime } from '../../utils'
import Button from '../../components/button'

const Alliance = (baseUrl, color, alliance) => (
  <a
    href={`${baseUrl}/alliance/${color}`}
    key={alliance.color}
    class={`${allianceClass} ${
      alliance.color === 'red' ? redClass : blueClass
    }`}
  >
    {alliance.alliance.teams.map(team => (
      <RobotImage
        team={formatTeamNumber(team.number)}
        color={alliance.color}
        key={team.number}
      />
    ))}
    <div class={scoreClass}>
      <h2>Score</h2>
      <span>{alliance.alliance.score}</span>
    </div>
  </a>
)
const Match = wrap(
  ({ eventId, matchId, data: { event, match } }) => {
    const url = `/events/${eventId}/${matchId}`
    return (
      <div class={matchClass}>
        <Header
          title={`${matchId.toUpperCase()} - ${(event && event.shortName) ||
            eventId}`}
          back={`/events/${eventId}`}
        />
        <div class={matchNameClass}>
          <h2>{formatMatchId(matchId)}</h2>
        </div>
        <div class={matchTimeClass}>
          <h2>
            {match
              ? formatTime(match.actualTime || match.predictedTime)
              : 'Loading...'}
          </h2>
          <Button href={`${url}/scout`}>Scout</Button>
        </div>
        {match && (
          <Alliance color="red" alliance={match.redAlliance} baseUrl={url} />
        )}
        {match && (
          <Alliance color="blue" alliance={match.blueAlliance} baseUrl={url} />
        )}
        {!match || <Spinner />}
      </div>
    )
  },
  ({ eventId, matchId }) => ({
    match: getMatch(eventId, matchId),
    event: getEvent(eventId)
  })
)

export default Match
