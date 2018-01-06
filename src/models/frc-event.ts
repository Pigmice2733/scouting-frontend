import Match from './match'

interface FRCEvent {
  key: string
  name: string
  shortName: string
  date: string
  parsedDate?: Date
  matches?: Match[]
  distanceFromToday?: number
}

export default FRCEvent
