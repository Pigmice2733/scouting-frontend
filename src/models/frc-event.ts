import Match from './match'

interface FRCEvent {
  key: string
  name: string
  shortName: string
  date: string
  eventType: number
  parsedDate?: Date
  distanceFromToday?: number
  matches?: Match[]
}

export default FRCEvent
