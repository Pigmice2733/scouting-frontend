import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent } from '../../api'
import { parseMatchKey } from '../../utils'
import { event as eventClass } from './style.sss'
import List from '../../components/list'
import Spinner from '../../components/spinner'
import DateDisplay from '../../components/date-display'
import FRCEvent from '../../models/frc-event'

interface EventProps {
  eventId: string
  data: {
    event: FRCEvent
  }
}

const Event = wrap(
  ({ eventId, data: { event } }: EventProps) => {
    const { matches } = event
    return (
      <div class={eventClass}>
        <Header title={event.shortName || `Event ${eventId}`} back="/" />
        <DateDisplay date={event.date && new Date(event.date)} />
        {matches === undefined ? (
          <Spinner />
        ) : matches === null || matches.length === 0 ? (
          <p>No Matches</p>
        ) : (
          <List>
            {matches
              .map(m => {
                m.time = new Date(m.actualTime || m.predictedTime)
                return m
              })
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map(m => {
                const { matchKey } = parseMatchKey(m.key)
                return (
                  <li key={m.key}>
                    <a href={`/events/${event.key}/${matchKey}`}>
                      {matchKey.toUpperCase()}
                    </a>
                  </li>
                )
              })}
          </List>
        )}
      </div>
    )
  },
  ({ eventId }: EventProps) => ({ event: getEvent(eventId) })
)

export default Event
