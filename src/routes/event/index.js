import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent } from '../../api'
import { parseMatchKey } from '../../utils'
import { event as eventClass } from './style'
import List from '../../components/list'
import Spinner from '../../components/spinner'
import DateDisplay from '../../components/date-display'

const Event = wrap(
  ({ eventId, data: { event = {} } }) => {
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
                m.time = new DateDisplay(m.actualTime || m.predictedTime)
                return m
              })
              .sort((a, b) => a.time > b.time)
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
  ({ eventId }) => ({ event: getEvent(eventId) })
)

export default Event
