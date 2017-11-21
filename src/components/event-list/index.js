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
    var presentFutureEvents = [];
    var pastEvents = [];
    const twoDaysAgo = Date.now() - (2 * 24 * 60 * 60 * 1000);
    for (var e = 0; e < events.length; ++e) {
      try {
        events[e]['timestamp'] = (new Date(events[e]['date'])).getTime();
        if (events[e]['timestamp'] >= twoDaysAgo) {
          presentFutureEvents.push(events[e]);
        } else {
          pastEvents.push(events[e]);
        }
      } catch (err) {
        console.log("Error event date invalid -" + JSON.stringify(events[e]) + " - ", err);
      }
      var date = new Date(events[e]['date']);
      events[e]['name'] += " - " + (date.getMonth() + 0) + "/" + date.getDate() + "/" + date.getFullYear();
    }
    presentFutureEvents.sort(function(a, b) {
      return a['timestamp'] - b['timestamp'];
    });
    pastEvents.sort(function(a, b) {
      return b['timestamp'] - a['timestamp'];
    });
    const catEvents = presentFutureEvents.concat(pastEvents);
    return (
      <div class={style['event-list']}>
        <TextInput
          onInput={this.queryChanged}
          placeholder="Find an event"
          type="search"
          value={query}
        />
        <List>
          {catEvents
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
