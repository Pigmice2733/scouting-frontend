import { h } from 'preact'
import Resolver from '../../resolver'
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
} from './style.sss'
import RobotImage from '../../components/robot-image'
import { formatTeamNumber, formatMatchId, formatTime } from '../../utils'
import Button from '../../components/button'
import FRCEvent from '../../models/frc-event'
import Match from '../../models/match'

interface AllianceProps {
  baseUrl: string
  color: string
  alliance: string[]
  score: number
}

const Alliance = ({ baseUrl, color, alliance, score }: AllianceProps) => (
  <a
    href={`${baseUrl}/alliance/${color}`}
    key={color}
    class={`${allianceClass} ${color === 'red' ? redClass : blueClass}`}
  >
    {alliance.map(team => (
      <RobotImage team={formatTeamNumber(team)} color={color} key={team} />
    ))}
    <div class={scoreClass}>
      <h2>Score</h2>
      <span>{score}</span>
    </div>
  </a>
)

const Match = ({ eventId, matchId }: { eventId: string; matchId: string }) => (
  <Resolver
    data={{ match: getMatch(eventId, matchId), event: getEvent(eventId) }}
    render={({ match, event }) => {
      const url = `/events/${eventId}/${matchId}`
      const eventName = (event && event.shortName) || eventId
      return (
        <div class={matchClass}>
          <Header
            title={`${matchId.toUpperCase()} - ${eventName}`}
            back={`/events/${eventId}`}
          />
          <div class={matchNameClass}>
            <h2>{formatMatchId(matchId)}</h2>
          </div>
          <div class={matchTimeClass}>
            <h2>
              {match
                ? formatTime(new Date(match.actualTime || match.predictedTime))
                : 'Loading...'}
            </h2>
            <Button href={`${url}/scout`}>Scout</Button>
          </div>
          {match && (
            <Alliance
              score={match.redScore}
              color="red"
              alliance={match.redAlliance}
              baseUrl={url}
            />
          )}
          {match && (
            <Alliance
              score={match.blueScore}
              color="blue"
              alliance={match.blueAlliance}
              baseUrl={url}
            />
          )}
          {!match && <Spinner />}
        </div>
      )
    }}
  />
)

export default Match
