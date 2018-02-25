import Match from './match'

interface FRCEvent {
  key: string
  name: string
  shortName: string
  date: string
  lat?: number
  long?: number
  eventType: number
  parsedDate?: Date
  distanceFromToday?: number
  distance?: number
  matches?: Match[]
}

export default FRCEvent
