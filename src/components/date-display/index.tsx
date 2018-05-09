import { h } from 'preact'
import { formatDate } from '../../utils'
import Icon from '../icon'
import style from './style.sss'

interface DateDisplayProps {
  date: Date | undefined
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <span class={style.date}>
      <Icon icon="calendar" />
      {date ? formatDate(date) : 'Loading...'}
    </span>
  )
}

export default DateDisplay
