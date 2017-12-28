import { h } from 'preact'
import { date as dateClass } from './style'

import Icon from '../icon'

const DateDisplay = ({ date }) => {
  return (
    <div class={dateClass}>
      <Icon icon="calendar" />
      {date ? date.toLocaleDateString() : 'Loading...'}
    </div>
  )
}

export default DateDisplay
