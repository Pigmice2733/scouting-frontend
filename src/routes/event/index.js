import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent } from '../../api'
import style from './style'
import List from '../../components/list'

const formatMatchName = name => name.replace(/[^_]*_/, '')

const Event = wrap(
  ({ eventId, data: { event = {} } }) => {
    const date = event.date && new Date(event.date)
    const matches = event.matches || []
    return (
      <div class={style.event}>
        <Header title={event.name || `Event ${eventId}`} back="/" />
        {date && <p>{date.toLocaleDateString()}</p>}
        <List>
          {matches.map(m => (
            <li key={m.key}>
              <a href={`/events/${event.key}/${m.key}`}>
                {formatMatchName(m.key).toUpperCase()}
              </a>
            </li>
          ))}
        </List>
        <pre>{JSON.stringify(event)}</pre>
      </div>
    )
  },
  ({ eventId }) => ({ event: getEvent(eventId) })
)

export default Event
