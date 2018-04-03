import { Component, h } from 'preact'
import { route } from 'preact-router'
import { getSchema, getTeamsAtEvent, getTeamStats } from '../../api'
import Chart from '../../components/chart'
import Header from '../../components/header'
import RobotImage from '../../components/robot-image'
import Spinner from '../../components/spinner'
import Report from '../../models/report'
import Resolver from '../../resolver'
import {
  camelToTitle,
  compareMatchKey,
  compareTeams,
  formatTeamNumber
} from '../../utils'
import {
  chart,
  chooser,
  compare,
  err,
  robotImage,
  team as teamClass
} from './style.sss'

interface CompareProps {
  teams: string[]
  statsTeam1: Report[]
  statsTeam2: Report[]
  schema: { [key: string]: string }
}

const Compare = ({
  eventId,
  team1,
  team2,
  back
}: {
  eventId: string
  team1?: string
  team2?: string
  back: string
}) => (
  <Resolver
    data={{
      teams: getTeamsAtEvent(eventId),
      statsTeam1: getTeamStats(eventId, team1),
      statsTeam2: getTeamStats(eventId, team2),
      schema: getSchema()
    }}
    render={({ teams, statsTeam1, statsTeam2, schema }: CompareProps) => {
      if (teams === undefined || schema === undefined) {
        return <Spinner />
      }

      const firstTeam = formatTeamNumber(teams[0])

      if (team1 === '' || team2 === '') {
        if (team1 === '') {
          team1 = firstTeam
        }

        if (team2 === '') {
          team2 = firstTeam
        }

        route(`/events/${eventId}/compare/${team1}/${team2}?back=${back}`)
      }

      const sortedTeams = (teams || []).sort(compareTeams)

      const sortedTeamStats = (statsTeam1 || [])
        .concat(statsTeam2 || [])
        .sort((a, b) => compareMatchKey(a.matchKey, b.matchKey))

      return (
        <div>
          <Header
            title={teams !== null ? `Compare: ${team1} to ${team2}` : 'Compare'}
            back={back}
          />
          {teams === null ? (
            <p class={err}>No teams have been scouted for this event</p>
          ) : (
            <div class={compare}>
              <div class={chooser}>
                <div class={teamClass}>
                  <select
                    value={team1}
                    // onChange={e =>
                    //   route(
                    //     `/events/${eventId}/compare/${
                    //       (e.target as HTMLSelectElement).value
                    //     }/${team2}?back=${back}`
                    //   )
                    // }
                  >
                    {sortedTeams.map(team => (
                      <option value={formatTeamNumber(team)}>
                        {formatTeamNumber(team)}
                      </option>
                    ))}
                  </select>
                  <RobotImage
                    className={robotImage}
                    team={team1}
                    color="blue"
                  />
                </div>

                <div class={teamClass}>
                  <select
                    value={team2}
                    // onChange={e =>
                    //   route(
                    //     `/events/${eventId}/compare/${team1}/${
                    //       (e.target as HTMLSelectElement).value
                    //     }?back=${back}`
                    //   )
                    // }
                  >
                    {sortedTeams.map(team => (
                      <option value={formatTeamNumber(team)}>
                        {formatTeamNumber(team)}
                      </option>
                    ))}
                  </select>

                  <RobotImage className={robotImage} team={team2} color="red" />
                </div>
              </div>

              {Object.keys(schema).map(key => (
                <div class={chart}>
                  <h1>{camelToTitle(key)}</h1>
                  <Chart
                    reports={sortedTeamStats}
                    stat={key}
                    fieldType={schema[key]}
                    colorKey={{ [team1]: 'blue', [team2]: 'red' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }}
  />
)

export default Compare
