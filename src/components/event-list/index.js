import { h, Component } from 'preact'
import TextInput from '../../components/text-input'
import List from '../../components/list'
import { eventList as eventListClass } from './style'

class EventList extends Component {
  queryChanged = e => {
    this.setState({ query: e.target.value })
  }

  constructor() {
    super()
    this.state = { query: '' }
  }

  render({ events }, { query }) {
    const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000
    return (
      <div class={eventListClass}>
        <TextInput
          onInput={this.queryChanged}
          placeholder="Find an event"
          type="search"
          value={query}
        />
        <List>
          {events
            .filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
            .map(e => {
              e.date = new Date(e.date)
              return e
            })
            .sort((a, b) => {
              if (a.date > b.date) {
                return b.date > twoDaysAgo ? 1 : -1
              } else {
                return a.date > twoDaysAgo ? -1 : 1
              }
            })
            .map(e => (
              <li key={e.key}>
                <a href={`/events/${e.key}`}>{e.name}</a>
              </li>
            ))}
        </List>
      </div>
    )
  }
}

export default EventList
