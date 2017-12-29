import FRCEvent from './models/frc-event'
import Match from './models/match'

const queryAPI = (path: string): Promise<any> =>
  fetch(`https://scouting.netlify.com/api/${path}`).then(d => d.json())

const getEvents = (): Promise<FRCEvent[]> => queryAPI('events')

const getEvent = (eventKey: string): Promise<FRCEvent> =>
  queryAPI(`events/${eventKey}`)

const getMatch = (eventKey: string, matchKey: string): Promise<Match> =>
  queryAPI(`events/${eventKey}/${eventKey}_${matchKey}`)

export { getEvents, getEvent, getMatch }
