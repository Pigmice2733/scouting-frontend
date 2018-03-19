import { h } from 'preact'
import { formatDate } from '../../utils'
import Icon from '../icon'
import { date as dateClass } from './style.sss'

interface DateDisplayProps {
  date: Date | undefined
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <span class={dateClass}>
      <Icon icon="calendar" />
      {date ? formatDate(date) : 'Loading...'}
    </span>
  )
}

export default DateDisplay
