import { h } from 'preact'
import { getEvent } from '../../api'
import Button from '../../components/button'
import DateDisplay from '../../components/date-display'
import Header from '../../components/header'
import Icon from '../../components/icon'
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
import { event as eventClass, match as matchClass } from './style.sss'

const Event = ({ eventId }: { eventId: string }) => (
  <Resolver
    data={{ event: getEvent(eventId) }}
    render={({ event }) => (
      <div class={eventClass}>
        <Header
          title={(event && event.shortName) || `Event ${eventId}`}
          back="/"
        />
        <div>
          <Button href={`/events/${eventId}/analysis`}>View Analysis</Button>
          <Button href={`/events/${eventId}/compare?back=/events/${eventId}`}>
            Compare Teams
          </Button>
        </div>
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
                    <a
                      class={matchClass}
                      href={`/events/${event.key}/${matchKey}`}
                    >
                      <div>
                        <span>{formatMatchKey(matchKey)}</span>
                        <span>{formatTime(m.time)}</span>
                      </div>
                    </a>
                    {m.youtubeURL !== '' ? (
                      <a href={m.youtubeURL} target="_blank">
                        <Icon icon="youtube" fill="red" />
                      </a>
                    ) : (
                      <a>
                        <Icon icon="youtube" fill="grey" />
                      </a>
                    )}
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
