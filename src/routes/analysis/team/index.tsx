import { h } from 'preact'
import Resolver from '../../../resolver'
import { getEvent, getTeamStats, getSchema } from '../../../api'
import Table from '../../../components/table'
import Header from '../../../components/header'
import Spinner from '../../../components/spinner'
import Report from '../../../models/report'
import Chart from '../../../components/chart'
import { camelToTitle, getNumber, parseMatch } from '../../../utils'
import { teamAnalysis } from './style.sss'

const TeamAnalysis = ({ eventId, team }: { eventId: string; team: string }) => (
  <Resolver
    data={{
      event: getEvent(eventId),
      teamStats: getTeamStats(eventId, team),
      schema: getSchema()
    }}
    render={({ event, teamStats, schema }) => {
      const sorted =
        teamStats === undefined
          ? []
          : teamStats.sort((a: Report, b: Report) => {
              const aParsed = parseMatch(a.matchKey)
              const bParsed = parseMatch(b.matchKey)

              if (aParsed.type === bParsed.type) {
                if (aParsed.n === bParsed.n) {
                  return aParsed.m < bParsed.m ? -1 : 1
                }
                return aParsed.n < bParsed.n ? -1 : 1
              }
              return aParsed.type > bParsed.type ? -1 : 1
            })

      return (
        <div class={teamAnalysis}>
          <Header
            back={`/events/${eventId}/analysis`}
            title={`Stat Analysis - ${(event && event.shortName) ||
              eventId} - Team ${team}`}
          />

          <div>
            {Object.keys(schema).map(key => (
              <div>
                <h1>{camelToTitle(key)}</h1>
                {teamStats === undefined || teamStats.length === 0 ? (
                  <Spinner />
                ) : (
                  <Chart
                    reports={teamStats}
                    stat={key}
                    fieldType={schema[key]}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }}
  />
)

export default TeamAnalysis
