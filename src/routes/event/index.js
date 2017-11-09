import { h } from 'preact'
import wrap from '../../wrap'
import { getEvent } from '../../api'

const Event = wrap(
  ({ eventId, data = {} }) => {
    const event = (data.event && data.event.event) || {}
    const date = event.date && new Date(event.date)
    return (
      <div class="event">
        <h1>{event.name || `Event ${eventId}`}</h1>
        {date && <p>{date.toLocaleDateString()}</p>}
        <pre>{JSON.stringify(data)}</pre>
      </div>
    )
  },
  ({ eventId }) => ({ event: getEvent(eventId) })
)

export default Event
