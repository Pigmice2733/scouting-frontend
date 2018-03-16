import { h } from 'preact'
import Header from '../../../components/header'
import Spinner from '../../../components/spinner'
import Table from '../../../components/table'
import Resolver from '../../../resolver'
import Analysis from '../../../models/analysis'
import { getAllianceAnalysis, getSchema } from '../../../api'
import { camelToTitle } from '../../../utils'
import { allianceAnalysis } from './style.sss'

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
        <div class={allianceAnalysis}>
          <Header
            title={`${matchId.toUpperCase()} - ${camelToTitle(color)} Alliance`}
            back={`/events/${eventId}/${matchId}`}
          />
          {!data ? (
            <Spinner />
          ) : data.length === 0 ? (
            <p>No reports have been submitted for this alliance yet.</p>
          ) : (
            <Table eventKey={eventId} analyses={data} schema={schema} />
          )}
        </div>
      )
    }}
  />
)

export default AllianceAnalysis
