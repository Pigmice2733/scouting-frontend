import { h } from 'preact'
import Resolver from '../../../resolver'
import { getEvent, getTeamStats, getSchema } from '../../../api'
import Table from '../../../components/table'
import Header from '../../../components/header'
import Spinner from '../../../components/spinner'
import Chart from '../../../components/chart'
import { camelToTitle, getNumber, compareMatchKey } from '../../../utils'
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
          : teamStats.sort((a, b) => compareMatchKey(a.matchKey, b.matchKey))

      return (
        <div class={teamAnalysis}>
          <Header
            back={`/events/${eventId}/analysis`}
            title={`${team} - ${(event && event.shortName) || eventId}`}
          />

          {schema === undefined ? (
            <Spinner />
          ) : (
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
          )}
        </div>
      )
    }}
  />
)

export default TeamAnalysis
