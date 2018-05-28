import { h } from 'preact'
import { getEvent } from '../../api'
import Button from '../../components/button'
import Header from '../../components/header'
import Icon from '../../components/icon'
import List from '../../components/list'
import Spinner from '../../components/spinner'
import Resolver from '../../resolver'
import {
  compareMatchKey,
  formatMatchKey,
  formatTime,
  parseMatchKey
} from '../../utils'
import style from './style.css'

const Event = ({ eventId }: { eventId: string }) => (
  <Resolver
    data={{ event: getEvent(eventId) }}
    render={({ event }) => (
      <div class={style.event}>
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
                      class={style.match}
                      href={`/events/${event.key}/${matchKey}`}
                    >
                      <div>
                        <span>{formatMatchKey(matchKey)}</span>
                        <span>{formatTime(m.time)}</span>
                      </div>
                    </a>
                    {m.youtubeURL !== '' ? (
                      <a
                        href={m.youtubeURL}
                        target="_blank"
                        rel="noopener"
                        aria-label="Watch on YouTube"
                      >
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
