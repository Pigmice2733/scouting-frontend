const queryAPI = path =>
  fetch(`https://scouting.netlify.com/api/${path}`).then(d => d.json())

const getEvents = () => queryAPI('events')
const getEvent = eventKey => queryAPI(`events/${eventKey}`)
const getMatch = (eventKey, matchKey) =>
  queryAPI(`events/${eventKey}/${eventKey}_${matchKey}`)

const parseMatchKey = name => {
  const [, eventKey, matchKey] = name.match(/([^_]*)_(.*)/)
  return { eventKey, matchKey }
}

export { getEvents, getEvent, getMatch, parseMatchKey }
