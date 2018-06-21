import { get, set } from 'idb-keyval'
import { h, render } from 'preact'
import { queryAPI, Req } from './api'
import App from './components/app'

const rootNode = document.getElementById('app')

render(<App />, rootNode, rootNode.lastElementChild)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.nomodule.js')
}

const syncRequests = async () => {
  const requests = await get<Req[]>('cachedRequests')
  if (requests !== undefined) {
    await Promise.all(requests.map(re => queryAPI(re.path, re.method, re.body)))
  }
  await set('cachedRequests', [])
}

if (navigator.onLine) {
  syncRequests()
}
