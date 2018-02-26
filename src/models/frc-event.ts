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
  parsedDate?: Date
  parsedEndDate?: Date
  distanceFromToday?: number
  distance?: number
  matches?: Match[]
}

export default FRCEvent
