import Dexie from 'dexie'

const cacheName = 1
const staticAssets = ['/scripts.js', '/index.html', '/styles.css']
const ignore = ['/browser-sync']

const isPathIgnored = path =>
  ignore.map(i => `${self.location.origin}/${i}`).includes(path)

class DB {
  constructor() {
    this.db = new Dexie('scouting')
    this.db.version(1).stores({ events: '&key' })
  }

  addEvents = async events => {
    await this.db.events.clear()
    await this.db.events.bulkAdd(events)
  }

  getEvents = () => {
    return this.db.events.toArray()
  }

  addEvent = event => {
    return this.db.events.update(event.key, event)
  }

  getEvent = eventId => {
    return this.db.events.get(eventId)
  }
}

const scoutingDB = new DB()

self.addEventListener('install', e => {
  e.waitUntil(async () => {
    const cache = await caches.open(cacheName)
    cache.addAll(staticAssets)
    console.log('Service Worker Installed')
  })
})

self.addEventListener('fetch', event => {
  // don't worry about non-GET requests
  // @TODO hold these somewhere until reconnection
  const { request } = event
  if (request.method !== 'GET') {
    return
  }

  if (request.url === 'https://scouting.netlify.com/api/events') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          res
            .clone()
            .json()
            .then(events => scoutingDB.addEvents(events))
          return res
        })
        .catch(async () => {
          const events = await scoutingDB.getEvents()
          return new Response(JSON.stringify(events))
        })
    )
  } else if (
    request.url.match(/https:\/\/scouting.netlify.com\/api\/events\/.*/)
  ) {
    const eventKey = request.url.match(
      /https:\/\/scouting.netlify.com\/api\/events\/(.*)/
    )[1]
    event.respondWith(
      fetch(event.request)
        .then(res => {
          res
            .clone()
            .json()
            .then(e => scoutingDB.addEvent(e))
          return res
        })
        .catch(
          async () =>
            new Response(JSON.stringify(await scoutingDB.getEvent(eventKey)))
        )
    )
  } else if (!isPathIgnored(request.url)) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          caches
            .open(cacheName)
            .then(cache => cache.put(event.request, res.clone()))
          return res
        })
        .catch(() => {
          const res = caches.match(event.request)
          if (res) {
            return res
          }
          return false
        })
    )
  }
})
