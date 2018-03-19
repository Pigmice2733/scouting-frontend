import App from './components/app'
import { render, h } from 'preact'
import idbKeyval from 'idb-keyval'
import { req, queryAPI } from './api'

const rootNode = document.getElementById('app')

render(<App />, rootNode, rootNode.lastElementChild)

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

var module: {
  hot: {
    accept: () => void
  }
}

if (module.hot) {
  module.hot.accept()
}
