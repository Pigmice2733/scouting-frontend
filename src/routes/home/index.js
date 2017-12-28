import { h, Component } from 'preact'
import { home } from './style'
import wrapData from '../../wrap'
import TextInput from '../../components/text-input'
import { getEvents } from '../../api'
import { sortEvents } from '../../utils'
import Spinner from '../../components/spinner'
import List from '../../components/list'
import DateDisplay from '../../components/date-display'

class Home extends Component {
  constructor() {
    super()
    this.setState({ query: '' })
  }

  queryChanged = e => {
    this.setState({ query: e.target.value })
  }

  render({ data }, { query }) {
    const sortedEvents = sortEvents(data.events || [])
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
        {data.events === undefined ? (
          <Spinner />
        ) : data.events.length === 0 ? (
          'No matching events'
        ) : (
          <List>
            {matchingEvents.map(e => (
              <li key={e.key}>
                <a href={`/events/${e.key}`}>
                  {e.shortName}
                  <DateDisplay date={e.date} />
                </a>
              </li>
            ))}
          </List>
        )}
      </div>
    )
  }
}

export default wrapData(Home, () => ({
  events: getEvents()
}))
