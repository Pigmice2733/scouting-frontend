import { h } from 'preact'
import style from './style'
import Event from '../../components/event'

export default (props) => (
  <div>
    <Event event_id={props.matches.event_id} />
  </div>
)
