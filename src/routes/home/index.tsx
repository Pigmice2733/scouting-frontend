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
  navigationDrawerButtonColumn,
  navigationDrawerButton,
  navigationDrawerBackground,
  navigationDrawerContent,
  subheader as navigationSubheader,
  icon as navigationIcon,
  open as openClass
} from './style.sss'
import Icon from '../../components/icon'

class NavigationItem {
  label: string
  link: string
  // The Icon name, not an SVG string
  icon: string
}

interface NavigationState {}

interface NavigationProps {
  contents: Array<NavigationItem>
  isOpen: boolean
  toggleMenu: () => void
}

class NavigationDrawer extends Component<NavigationProps, NavigationState> {
  constructor() {
    super()
  }

  render(
    { contents, isOpen, toggleMenu }: NavigationProps,
    {  }: NavigationState
  ) {
    return (
      <div class={isOpen ? openClass : ''}>
        <div class={navigationDrawerBackground} onClick={toggleMenu} />
        <div class={navigationDrawerContent}>
          <li class={navigationSubheader}>
            <span class={navigationIcon}>
              <span onClick={toggleMenu}>
                <Icon icon="left" fill="currentColor" fill-opacity="0.56" />
              </span>
            </span>
          </li>
          {contents.map(function(item) {
            return (
              <a href={item.link}>
                <li>
                  <span class={navigationIcon}>
                    <Icon
                      icon={item.icon}
                      fill="currentColor"
                      fill-opacity="0.56"
                    />
                  </span>
                  <span>{item.label}</span>
                </li>
              </a>
            )
          })}
        </div>
      </div>
    )
  }
}

interface HomeProps {
  events: FRCEvent[]
}

interface HomeState {
  query: string
  loggedIn: boolean
  navigationMenuOpen: boolean
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
          this.state = { query: '', loggedIn: false, navigationMenuOpen: false }
        }

        componentWillMount() {
          this.setState({ loggedIn: hasValidJWT() })
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

        toggleMenu = () => {
          this.setState(({ navigationMenuOpen }: HomeState) => ({
            navigationMenuOpen: !navigationMenuOpen
          }))
        }

        render(
          { events }: HomeProps,
          { query, loggedIn, navigationMenuOpen }: HomeState
        ) {
          const sortedEvents = sortEvents(events || [])
          const matchingEvents = sortedEvents.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase())
          )
          let navigationContents = [
            { label: 'Leaderboard', link: '/leaderboard', icon: 'trophy' },
            { label: 'Credits', link: '/credits', icon: 'info' }
          ]

          if (hasValidJWT() && getUserInfo().isAdmin) {
            navigationContents.push({
              label: 'Admin',
              link: '/admin',
              icon: 'useredit'
            })
          }

          return (
            <div class={home}>
              <NavigationDrawer
                contents={navigationContents}
                isOpen={navigationMenuOpen}
                toggleMenu={this.toggleMenu}
              />
              <Header
                contents={
                  <div class={headerContents}>
                    <span class={navigationDrawerButtonColumn}>
                      <span
                        id={navigationDrawerButton}
                        onClick={this.toggleMenu}
                      >
                        <Icon icon="menu" />
                      </span>
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
                  {matchingEvents.map((e: FRCEvent) => (
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
