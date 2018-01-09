import { h, Component } from 'preact'
import { home } from './style.sss'
import Resolver from '../../resolver'
import SearchInput, { SearchInputEvent } from '../../components/search-input'
import { getEvents } from '../../api'
import { sortEvents, hasValidJWT, eventTypeName, abbreviate } from '../../utils'
import Spinner from '../../components/spinner'
import List from '../../components/list'
import DateDisplay from '../../components/date-display'
import FRCEvent from '../../models/frc-event'
import Button from '../../components/button'
import { route } from 'preact-router'
import Header from '../../components/header'
import { info as infoClass } from './style.sss'

interface HomeProps {
  events: FRCEvent[]
}

interface HomeState {
  query: string
}

export default () => (
  <Resolver
    data={{
      events: getEvents()
    }}
    render={
      class Home extends Component<HomeProps, HomeState> {
        constructor() {
          super()
          this.state = { query: '' }
        }

        queryChanged = (e: SearchInputEvent) => {
          this.setState({ query: e.target.value })
        }

        render({ events }: HomeProps, { query }: HomeState) {
          const sortedEvents = sortEvents(events || [])
          const matchingEvents = sortedEvents.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase())
          )
          return (
            <div class={home}>
              {hasValidJWT() ? null : <Button href="/login">Login</Button>}
              <Header
                contents={
                  <SearchInput
                    onInput={this.queryChanged}
                    placeholder="Search for events"
                    type="search"
                    value={query}
                  />
                }
              />
              {events === undefined ? (
                <Spinner />
              ) : events.length === 0 ? (
                'No matching events'
              ) : (
                <List>
                  {matchingEvents.map((e: FRCEvent) => (
                    <li key={e.key}>
                      <a href={`/events/${e.key}`}>
                        {e.shortName}
                        <div class={infoClass}>
                          {eventTypeName(e.eventType) ? (
                            <p>{eventTypeName(e.eventType)}</p>
                          ) : null}
                          <DateDisplay date={e.parsedDate} />
                        </div>
                      </a>
                    </li>
                  ))}
                </List>
              )}
            </div>
          )
        }
      }
    }
  />
)
