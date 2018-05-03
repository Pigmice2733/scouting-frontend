import { get, set } from 'idb-keyval'
import { ComponentChild, h, render } from 'preact'
import { queryAPI, Req } from './api'
import App from './components/app'

const rootNode = document.getElementById('app')
;(render as (
  node: ComponentChild,
  parent: Element | null,
  mergeWith?: Element | null
) => void)(<App />, rootNode, rootNode && rootNode.lastElementChild)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error)
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

declare const module: {
  hot: {
    accept: () => void
  }
}

if (module.hot) {
  module.hot.accept()
}
