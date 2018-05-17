import { h } from 'preact'
import { getEvent, getSchema, getTeamStats } from '../../../api'
import Button from '../../../components/button'
import Chart from '../../../components/chart'
import Header from '../../../components/header'
import Spinner from '../../../components/spinner'
import Resolver from '../../../resolver'
import { camelToTitle } from '../../../utils'
import style from './style.sss'

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
    render={({ event, teamStats, schema }) => (
      <div class={style.teamAnalysis}>
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
              <div key={key}>
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
    )}
  />
)

export default TeamAnalysis
