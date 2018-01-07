import { h } from 'preact'
import Icon from '../icon'

interface DateDisplayProps {
  date: Date | undefined
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <div>
      <Icon icon="calendar" />
      {date ? date.toLocaleDateString() : 'Loading...'}
    </div>
  )
}

export default DateDisplay
