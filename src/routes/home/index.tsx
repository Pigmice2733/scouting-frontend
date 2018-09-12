import { Component, h } from 'preact'
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
  eventTypeName,
  getCoords,
  getJWT,
  hasValidJWT,
  sortEvents
} from '../../utils'
import style from './style.css'

interface HomeProps {
  events: FRCEvent[]
}

interface HomeState {
  query: string
  loggedIn: boolean
  coords?: { lat: number; long: number }
}

const eventTypeClassMap = new Map<number, string>([
  [5, style.dcmp],
  [2, style.dcmp],
  [3, style.cmp],
  [4, style.cmp],
  [99, style.off],
  [100, style.pre]
])

const Home = () => (
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
          this.setState({ loggedIn: hasValidJWT(getJWT()) })

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

          const sortedEvents = sortEvents(matchingEvents, coords).slice(0, 25)

          return (
            <div class={style.home}>
              <Header
                contents={
                  <div class={style.headerContents}>
                    <span class={style.navigationDrawerButtonContainer}>
                      <a
                        class={style.navigationDrawerButton}
                        href="/leaderboard"
                        aria-label="Leaderboard"
                      >
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
                  {sortedEvents.map(e => (
                    <li key={e.key}>
                      <a href={`/events/${e.key}`}>
                        {e.shortName || e.name}
                        <div class={style.info}>
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
export default Home
