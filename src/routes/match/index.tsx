import { h, render } from 'preact'
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
  icons,
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
      const currentMatchIndex =
        event && event.matches
          ? event.matches.findIndex(
              ({ key }) => key === `${eventId}_${matchId}`
            )
          : 0
      const matches = event && event.matches
      const previousMatch = matches && matches[currentMatchIndex - 1]
      const nextMatch = matches && matches[currentMatchIndex + 1]
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
            {previousMatch !== undefined ? (
              <a
                class={navigationClass}
                href={`/events/${eventId}/${
                  parseMatchKey(previousMatch.key).matchKey
                }`}
                data-disabled={previousMatch === undefined}
              >
                <Icon icon="left" />
              </a>
            ) : (
              <a class={navigationClass}>
                <Icon icon="left" fill="gray" />
              </a>
            )}
            {match !== undefined ? (
              <div class={icons}>
                <a href={`/events/${eventId}/${matchId}/print`} target="_blank">
                  <Icon icon="print" />
                </a>

                <a
                  target="_blank"
                  href={`https://www.thebluealliance.com/match/${match.key}`}
                >
                  <Icon icon="tba" />
                </a>
                {match.youtubeURL !== '' ? (
                  <a href={match.youtubeURL} target="_blank">
                    <Icon icon="youtube" />
                  </a>
                ) : null}
              </div>
            ) : null}
            {nextMatch !== undefined ? (
              <a
                class={navigationClass}
                href={`/events/${eventId}/${
                  parseMatchKey(nextMatch.key).matchKey
                }`}
                data-disabled={nextMatch === undefined}
              >
                <Icon icon="right" />
              </a>
            ) : (
              <a class={navigationClass}>
                <Icon icon="right" fill="gray" />
              </a>
            )}
          </div>
        </div>
      )
    }}
  />
)

export default Match
