import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent, parseMatchKey } from '../../api'
import { event as eventClass } from './style'
import List from '../../components/list'

const Event = wrap(
  ({ eventId, data: { event = {} } }) => {
    const date = event.date && new Date(event.date)
    const matches = event.matches || []
    return (
      <div class={eventClass}>
        <Header title={event.name || `Event ${eventId}`} back="/" />
        {date && <p>{date.toLocaleDateString()}</p>}
        <List>
          {matches.map(m => {
            const matchKey = parseMatchKey(m.key)['matchKey']
            return (
              <li key={m.key}>
                <a href={`/events/${event.key}/${matchKey}`}>
                  {matchKey.toUpperCase()}
                </a>
              </li>
            )
          })}
        </List>
      </div>
    )
  },
  ({ eventId }) => ({ event: getEvent(eventId) })
)

export default Event
