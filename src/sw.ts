/// <reference path="./sw.d.ts" />

const cacheName = '2'
const staticAssets = ['/', '/scripts.js', '/styles.css']
const ignore = ['/browser-sync/']

const getPath = (url: string) => url.replace(self.location.origin, '')

const isPathIgnored = (path: string) => {
  return ignore.some(i => path.startsWith(`${self.location.origin}${i}`))
}

self.addEventListener('install', (e: InstallEvent) => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(staticAssets)))
})

self.addEventListener('fetch', (event: FetchEvent) => {
  // don't worry about non-GET requests
  // @TODO hold these somewhere until reconnection
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
          console.log(`saving request to ${reqPath}`)
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
            console.log(`responding from cache for ${reqPath}`)
            return res
          }
          console.log(await (await caches.open(cacheName)).keys())
          throw new Error(`${reqPath} not found in cache`)
        })
    )
  }
})
