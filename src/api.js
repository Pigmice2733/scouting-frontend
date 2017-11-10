const queryAPI = path =>
  fetch(`https://scouting.netlify.com/api/${path}`).then(d => d.json())

const getEvents = () => queryAPI('events')
const getEvent = eventKey => queryAPI(`events/${eventKey}`)

export { getEvents, getEvent }
