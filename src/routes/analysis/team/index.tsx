import { h } from 'preact'
import { getEvent, getSchema, getTeamStats } from '../../../api'
import Button from '../../../components/button'
import Chart from '../../../components/chart'
import Header from '../../../components/header'
import Spinner from '../../../components/spinner'
import Table from '../../../components/table'
import Resolver from '../../../resolver'
import { camelToTitle, compareMatchKey, getNumber } from '../../../utils'
import { teamAnalysis } from './style.sss'

const TeamAnalysis = ({
  eventId,
  team,
  back
}: {
  eventId: string
  team: string
  back: string
}) => (
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
            title={`${team} - ${(event && event.shortName) || eventId}`}
            back={back}
          />

          {schema === undefined ? (
            <Spinner />
          ) : (
            <div>
              <Button
                href={`/events/${eventId}/compare/${team}?back=/events/${eventId}/team/${team}?back=${back}`}
              >
                Compare
              </Button>

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
