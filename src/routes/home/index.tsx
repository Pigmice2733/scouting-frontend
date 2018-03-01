import { h, Component } from 'preact'
import { home } from './style.sss'
import Resolver from '../../resolver'
import SearchInput, { SearchInputEvent } from '../../components/search-input'
import { getEvents } from '../../api'
import {
  sortEvents,
  hasValidJWT,
  getUserInfo,
  eventTypeName,
  abbreviate
} from '../../utils'
import Spinner from '../../components/spinner'
import List from '../../components/list'
import DateDisplay from '../../components/date-display'
import FRCEvent from '../../models/frc-event'
import Button from '../../components/button'
import { route } from 'preact-router'
import Header from '../../components/header'
import {
  info as infoClass,
  headerContents,
  dcmp,
  cmp,
  off,
  pre,
  navigationDrawerButtonContainer,
  navigationDrawerButton
} from './style.sss'
import Icon from '../../components/icon'

interface HomeProps {
  events: FRCEvent[]
}

interface HomeState {
  query: string
  loggedIn: boolean
  coords?: Coordinates
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
          this.state = { query: '', loggedIn: false }
        }

        componentWillMount() {
          this.setState({ loggedIn: hasValidJWT() })

          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(pos =>
              this.setState({ coords: pos.coords })
            )
          }
        }

        queryChanged = (e: SearchInputEvent) => {
          this.setState({ query: e.target.value })
        }

        logout = () => {
          localStorage.removeItem('jwt')
          this.setState({ loggedIn: false })
        }

        eventTypeClass = (eventType: Number) => {
          return eventTypeClassMap.get(eventType)
        }

        render({ events }: HomeProps, { query, loggedIn, coords }: HomeState) {
          const matchingEvents = (events !== undefined ? events : []).filter(
            e => e.name.toLowerCase().includes(query.toLowerCase())
          )

          const sortedEvents = sortEvents(matchingEvents, coords)

          return (
            <div class={home}>
              <Header
                contents={
                  <div class={headerContents}>
                    <span class={navigationDrawerButtonContainer}>
                      <a class={navigationDrawerButton} href="/leaderboard">
                        <Icon fill="#FFF" icon="trophy" />
                      </a>
                    </span>
                    <SearchInput
                      onInput={this.queryChanged}
                      placeholder="Search for events"
                      value={query}
                    />
                    {loggedIn ? (
                      <Button onClick={this.logout}>Log Out</Button>
                    ) : (
                      <Button href="/login">Login</Button>
                    )}
                  </div>
                }
              />
              {events === undefined ? (
                <Spinner />
              ) : events.length === 0 ? (
                'No matching events'
              ) : (
                <List>
                  {sortedEvents.map((e: FRCEvent) => (
                    <li key={e.key}>
                      <a href={`/events/${e.key}`}>
                        {e.shortName || e.name}
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
