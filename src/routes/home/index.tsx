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
import { info as infoClass, dcmp, cmp, off, pre } from './style.sss'

interface HomeProps {
  events: FRCEvent[]
}

interface HomeState {
  query: string
}

const eventTypeClassMap = new Map<Number, string>([
  [5, dcmp],
  [2, dcmp],
  [3, cmp],
  [4, cmp],
  [99, off],
  [100, pre]
])

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

        eventTypeClass = (eventType: Number) => {
          return eventTypeClassMap.get(eventType)
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
                            <span class={this.eventTypeClass(e.eventType)}>
                              {eventTypeName(e.eventType)}
                            </span>
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
