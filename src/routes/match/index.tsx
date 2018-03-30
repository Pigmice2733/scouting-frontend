import { h } from 'preact'
import { getEvent, getMatch } from '../../api'
import Button from '../../components/button'
import Header from '../../components/header'
import Icon from '../../components/icon'
import RobotImage from '../../components/robot-image'
import Spinner from '../../components/spinner'
import FRCEvent from '../../models/frc-event'
import Resolver from '../../resolver'
import {
  formatMatchKey,
  formatTeamNumber,
  formatTime,
  parseMatchKey
} from '../../utils'
import {
  alliance as allianceClass,
  blue as blueClass,
  match as matchClass,
  matchName as matchNameClass,
  matchTime as matchTimeClass,
  navbar,
  navigation as navigationClass,
  red as redClass,
  score as scoreClass
} from './style.sss'

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
      <RobotImage team={formatTeamNumber(team)} color={color} />
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
      const currentMatchIndex = event.matches.findIndex(
        ({ key }) => key === `${eventId}_${matchId}`
      )
      const nextMatch = event.matches[currentMatchIndex + 1]
      const previousMatch = event.matches[currentMatchIndex - 1]
      const nextMatchKey = nextMatch && parseMatchKey(nextMatch.key).matchKey
      const previousMatchKey =
        previousMatch && parseMatchKey(previousMatch.key).matchKey
      return (
        <div class={matchClass}>
          <Header
            title={`${matchId.toUpperCase()} - ${eventName}`}
            back={`/events/${eventId}`}
          />
          <div class={matchNameClass}>
            <h2>{formatMatchKey(matchId)}</h2>
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
          <div class={navbar}>
            {previousMatchKey !== undefined ? (
              <a
                class={navigationClass}
                href={`/events/${eventId}/${previousMatchKey}`}
                data-disabled={previousMatchKey === undefined}
              >
                <Icon icon="left" /> Previous Match
              </a>
            ) : (
              <div />
            )}
            {nextMatchKey !== undefined ? (
              <a
                class={navigationClass}
                href={`/events/${eventId}/${nextMatchKey}`}
                data-disabled={nextMatchKey === undefined}
              >
                Next Match <Icon icon="right" />
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>
      )
    }}
  />
)

export default Match
