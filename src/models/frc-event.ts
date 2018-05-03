import Match from './match'

interface FRCEvent {
  key: string
  name: string
  shortName: string
  date: string
  endDate: string
  lat?: number
  long?: number
  eventType: number
  matches?: Match[]
}

export default FRCEvent
