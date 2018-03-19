import { h } from 'preact'

import { getEvent, getEventAnalysis, getSchema } from '../../../api'
import Resolver from '../../../resolver'

import Header from '../../../components/header'
import Table from '../../../components/table'

import { eventAnalysis as eventAnalysisClass } from './style.sss'

const EventAnalysis = ({ eventId }: { eventId: string }) => (
  <Resolver
    data={{
      event: getEvent(eventId),
      eventAnalysis: getEventAnalysis(eventId),
      schema: getSchema()
    }}
    render={({ event, eventAnalysis, schema }) => (
      <div class={eventAnalysisClass}>
        <Header
          back={`/events/${eventId}`}
          title={`Analysis - ${(event && event.shortName) || eventId}`}
        />
        {schema &&
          eventAnalysis && (
            <Table
              eventKey={eventId}
              schema={schema}
              analyses={eventAnalysis}
            />
          )}
      </div>
    )}
  />
)

export default EventAnalysis
