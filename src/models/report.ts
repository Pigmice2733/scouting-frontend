type Stat = number | boolean

interface Report {
  team: string
  stats: { [key: string]: Stat }
  notes: { [key: string]: string }
  eventKey: string
  matchKey: string
}

export default Report
