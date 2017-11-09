import { h } from 'preact'
import style from './style'
import EventList from '../../components/event-list'
import wrapData from '../../wrap'
import { getEvents } from '../../api'

export default wrapData(
  ({ data }) => (
    <div class={style.home}>
      <h1>Pigmice Scouting</h1>
      {data.events ? <EventList events={data.events} /> : <p>Loading...</p>}
    </div>
  ),
  () => ({
    events: getEvents()
  })
)
