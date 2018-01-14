import { h } from 'preact'

import Resolver from '../../../resolver'
import { getEvent, getEventAnalysis, getSchema } from '../../../api'

import Table from '../../../components/table'
import Header from '../../../components/header'

const EventAnalysis = ({ eventId }: { eventId: string }) => (
  <Resolver
    data={{
      event: getEvent(eventId),
      eventAnalysis: getEventAnalysis(eventId),
      schema: getSchema()
    }}
    render={({ event, eventAnalysis, schema }) => (
      <div>
        <Header
          back={`/events/${eventId}`}
          title={`Analysis - ${(event && event.shortName) || eventId}`}
        />
        {schema &&
          eventAnalysis && <Table schema={schema} analyses={eventAnalysis} />}
      </div>
    )}
  />
)

export default EventAnalysis
