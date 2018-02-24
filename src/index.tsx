import App from './components/app'
import { render, h } from 'preact'
import idbKeyval from 'idb-keyval'
import { req, queryAPI } from './api'

render(<App />, document.body, document.getElementById('app'))

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error)
}

if (navigator.onLine) {
  idbKeyval
    .get('cachedRequests')
    .then((requests: req[]) =>
      Promise.all(requests.map(re => queryAPI(re.path, re.method, re.body)))
    )
    .then(() => idbKeyval.set('cachedRequests', []))
    .then(() => {
      console.log('synced them all')
    })
}
