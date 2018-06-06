import { h } from 'preact'
import { getEvent, getMatch } from '../../api'
import Button from '../../components/button'
import Header from '../../components/header'
import Icon from '../../components/icon'
import RobotImage from '../../components/robot-image'
import Spinner from '../../components/spinner'
import Resolver from '../../resolver'
import {
  formatMatchKey,
  formatTeamNumber,
  formatTime,
  parseMatchKey
} from '../../utils'
import style from './style.css'

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
    class={`${style.alliance} ${color === 'red' ? style.red : style.blue}`}
  >
    {alliance.map(team => (
      <RobotImage key={team} team={formatTeamNumber(team)} color={color} />
    ))}
    <div class={style.score}>
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
        <div class={style.match}>
          <Header
            title={`${matchId.toUpperCase()} - ${eventName}`}
            back={`/events/${eventId}`}
          />
          <div class={style.matchName}>
            <h2>{formatMatchKey(matchId)}</h2>
          </div>
          <div class={style.matchTime}>
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
          <div class={style.navbar}>
            <a
              class={style.navigation}
              href={
                previousMatch &&
                `/events/${eventId}/${
                  parseMatchKey(previousMatch.key).matchKey
                }`
              }
            >
              <Icon icon="left" />
            </a>
            <div class={style.icons}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/events/${eventId}/${matchId}/print`}
              >
                <Icon icon="print" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.thebluealliance.com/match/${matchId}`}
              >
                <Icon icon="tba" />
              </a>
              {match && match.youtubeURL !== '' ? (
                <a
                  href={match.youtubeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="youtube" />
                </a>
              ) : null}
            </div>
            <a
              class={style.navigation}
              href={
                nextMatch &&
                `/events/${eventId}/${parseMatchKey(nextMatch.key).matchKey}`
              }
            >
              <Icon icon="right" />
            </a>
          </div>
        </div>
      )
    }}
  />
)

export default Match
