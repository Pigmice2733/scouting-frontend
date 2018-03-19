import { h } from 'preact'
import { getEvent } from '../../api'
import Button from '../../components/button'
import DateDisplay from '../../components/date-display'
import Header from '../../components/header'
import List from '../../components/list'
import Spinner from '../../components/spinner'
import FRCEvent from '../../models/frc-event'
import Resolver from '../../resolver'
import {
  compareMatchKey,
  formatMatchKey,
  formatTime,
  parseMatchKey
} from '../../utils'
import { event as eventClass } from './style.sss'

const Event = ({ eventId }: { eventId: string }) => (
  <Resolver
    data={{ event: getEvent(eventId) }}
    render={({ event }) => (
      <div class={eventClass}>
        <Header
          title={(event && event.shortName) || `Event ${eventId}`}
          back="/"
        />
        <Button href={`/events/${eventId}/analysis`}>View Analysis</Button>
        {typeof event === 'undefined' ? (
          <Spinner />
        ) : event.matches === null || event.matches.length === 0 ? (
          <p>No Matches</p>
        ) : (
          <List>
            {event.matches
              .map(m => {
                m.time = new Date(m.actualTime || m.predictedTime)
                return m
              })
              .sort((a, b) => compareMatchKey(a.key, b.key))
              .map(m => {
                const { matchKey } = parseMatchKey(m.key)
                return (
                  <li key={m.key}>
                    <a href={`/events/${event.key}/${matchKey}`}>
                      {formatMatchKey(matchKey)}
                      {<span>{formatTime(m.time)}</span>}
                    </a>
                  </li>
                )
              })}
          </List>
        )}
      </div>
    )}
  />
)

export default Event
