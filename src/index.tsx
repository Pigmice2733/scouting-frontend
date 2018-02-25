import App from './components/app'
import { render, h } from 'preact'
import idbKeyval from 'idb-keyval'
import { req, queryAPI } from './api'

render(<App />, document.body, document.getElementById('app'))

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error)
}

const syncRequests = async () => {
  const requests = (await idbKeyval.get('cachedRequests')) as req[]
  if (requests !== undefined) {
    await Promise.all(requests.map(re => queryAPI(re.path, re.method, re.body)))
  }
  await idbKeyval.set('cachedRequests', [])
}

if (navigator.onLine) {
  syncRequests()
}
