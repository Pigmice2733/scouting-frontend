const cacheName = '2'
const staticAssets = ['/', '/scripts.js', '/styles.css']
const ignore = ['/browser-sync/']

const getPath = (url: string) => url.replace(self.location.origin, '')

const isPathIgnored = (path: string) => {
  return ignore.some(i => path.startsWith(`${self.location.origin}${i}`))
}

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void
}

interface FetchEvent extends ExtendableEvent {
  request: Request
  respondWith(response: Promise<Response> | Response): Promise<Response>
}

interface InstallEvent extends ExtendableEvent {
  activeWorker: ServiceWorker
}

self.addEventListener('install', (e: InstallEvent) => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(staticAssets)))
})

self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event
  if (request.method !== 'GET') {
    return
  }
  if (!request.url.startsWith(self.location.origin)) {
    return
  }
  if (!isPathIgnored(request.url)) {
    const reqPath = getPath(request.url)
    event.respondWith(
      fetch(request)
        .then(res => {
          event.waitUntil(
            (async () => {
              const cloned = await res.clone()
              const cache = await caches.open(cacheName)
              await cache.put(request, cloned)
            })()
          )
          return res
        })
        .catch(async () => {
          const res = await caches.match(event.request)
          if (res) {
            return res
          }
          throw new Error(`${reqPath} not found in cache`)
        })
    )
  }
})
