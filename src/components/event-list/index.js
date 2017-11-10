import { h, Component } from 'preact'
import TextInput from '../../components/text-input'
import List from '../../components/list'
import style from './style'

class EventList extends Component {
  queryChanged = e => {
    this.setState({ query: e.target.value })
  }

  constructor() {
    super()
    this.state = { query: '' }
  }

  render({ events }, { query }) {
    return (
      <div class={style['event-list']}>
        <TextInput
          onInput={this.queryChanged}
          placeholder="Find an event"
          type="search"
          value={query}
        />
        <List>
          {events
            .filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
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
