import Dexie from 'dexie'

const cacheName = 1
const staticAssets = ['/scripts.js', '/index.html', '/styles.css']
const ignore = ['/browser-sync/']

const isPathIgnored = path => {
  return ignore.some(i => path.startsWith(`${self.location.origin}${i}`))
}

class DB {
  constructor() {
    this.db = new Dexie('scouting')
    this.db.version(1).stores({ events: '&key' })
  }

  addEvents = async events => {
    console.log(`saving events`)
    await this.db.events.clear()
    await this.db.events.bulkAdd(events)
  }

  getEvents = () => {
    console.log(`retrieving events`)
    return this.db.events.toArray()
  }

  addEvent = event => {
    console.log(`saving event ${event.key}`)
    console.log(event)
    return this.db.events.update(event.key, event)
  }

  getEvent = eventId => {
    console.log(`retrieving event ${eventId}`)
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
      fetch(request)
        .then(res => {
          console.log(`saving request to ${request.url}`)
          res
            .clone()
            .then(cloned =>
              caches
                .open(cacheName)
                .then(cache => cache.put(event.request, cloned))
            )
          return res
        })
        .catch(() => {
          const res = caches.match(event.request)
          if (res) {
            console.log(`responding from cache for ${request.url}`)
            return res
          }
          console.log(`${request.url} not found in cache`)
          return false
        })
    )
  }
})
