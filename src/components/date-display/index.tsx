import { h } from 'preact'
import { date as dateClass } from './style.sss'

import Icon from '../icon'

interface DateDisplayProps {
  date: Date | undefined
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <div class={dateClass}>
      <Icon icon="calendar" />
      {date ? date.toLocaleDateString() : 'Loading...'}
    </div>
  )
}

export default DateDisplay
