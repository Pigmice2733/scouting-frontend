import { h, Component } from 'preact'
import { home } from './style.sss'
import Resolver from '../../resolver'
import TextInput, { TextInputEvent } from '../../components/text-input'
import { getEvents } from '../../api'
import { sortEvents } from '../../utils'
import Spinner from '../../components/spinner'
import List from '../../components/list'
import DateDisplay from '../../components/date-display'
import FRCEvent from '../../models/frc-event'

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

        queryChanged = (e: TextInputEvent) => {
          this.setState({ query: e.target.value })
        }

        render({ events }: HomeProps, { query }: HomeState) {
          const sortedEvents = sortEvents(events || [])
          const matchingEvents = sortedEvents.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase())
          )
          return (
            <div class={home}>
              <TextInput
                onInput={this.queryChanged}
                placeholder="Search for events"
                type="search"
                value={query}
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
                        <DateDisplay date={e.parsedDate} />
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
