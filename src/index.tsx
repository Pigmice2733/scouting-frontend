import idbKeyval from 'idb-keyval'
import { h, render } from 'preact'
import { queryAPI, Req } from './api'
import App from './components/app'

const rootNode = document.getElementById('app')

render(<App />, rootNode, rootNode.lastElementChild)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error)
}

const syncRequests = async () => {
  const requests = (await idbKeyval.get('cachedRequests')) as Req[]
  if (requests !== undefined) {
    await Promise.all(requests.map(re => queryAPI(re.path, re.method, re.body)))
  }
  await idbKeyval.set('cachedRequests', [])
}

if (navigator.onLine) {
  syncRequests()
}

declare const module: {
  hot: {
    accept: () => void
  }
}

if (module.hot) {
  module.hot.accept()
}
