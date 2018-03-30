import { Component, h } from 'preact'
import { route } from 'preact-router'
import { getEvents } from '../../api'
import Button from '../../components/button'
import DateDisplay from '../../components/date-display'
import Header from '../../components/header'
import Icon from '../../components/icon'
import List from '../../components/list'
import SearchInput, { SearchInputEvent } from '../../components/search-input'
import Spinner from '../../components/spinner'
import FRCEvent from '../../models/frc-event'
import Resolver from '../../resolver'
import {
  abbreviate,
  eventTypeName,
  getCoords,
  getUserInfo,
  hasValidJWT,
  sortEvents
} from '../../utils'
import { home } from './style.sss'
import {
  cmp,
  dcmp,
  headerContents,
  info as infoClass,
  navigationDrawerButton,
  navigationDrawerButtonContainer,
  off,
  pre
} from './style.sss'

interface HomeProps {
  events: FRCEvent[]
}

interface HomeState {
  query: string
  loggedIn: boolean
  coords?: { lat: number; long: number }
}

const eventTypeClassMap = new Map<number, string>([
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
            getCoords((coords: { lat: number; long: number }) => {
              this.setState({ coords })
            })
          }
        }

        queryChanged = (e: SearchInputEvent) => {
          this.setState({ query: e.target.value })
        }

        logout = () => {
          localStorage.removeItem('jwt')
          this.setState({ loggedIn: false })
        }

        eventTypeClass = (eventType: number) => {
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
