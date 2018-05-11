import { h } from 'preact'
import { getAllianceAnalysis, getSchema } from '../../../api'
import Header from '../../../components/header'
import Spinner from '../../../components/spinner'
import Table from '../../../components/table'
import Analysis from '../../../models/analysis'
import Resolver from '../../../resolver'
import { camelToTitle } from '../../../utils'
import style from './style.sss'

const AllianceAnalysis = ({
  eventId,
  matchId,
  color
}: {
  eventId: string
  matchId: string
  color: string
}) => (
  <Resolver
    data={{
      data: getAllianceAnalysis(eventId, matchId, color),
      schema: getSchema()
    }}
    render={({ data, schema }) => {
      return (
        <div class={style.allianceAnalysis}>
          <Header
            title={`${matchId.toUpperCase()} - ${camelToTitle(color)} Alliance`}
            back={`/events/${eventId}/${matchId}/`}
          />
          {!data ? (
            <Spinner />
          ) : data.length === 0 ? (
            <p>No reports have been submitted for this alliance yet.</p>
          ) : (
            <Table
              back={`/events/${eventId}/${matchId}/alliance/${color}`}
              eventKey={eventId}
              analyses={data}
              schema={schema}
            />
          )}
        </div>
      )
    }}
  />
)

export default AllianceAnalysis
