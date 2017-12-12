import App from './components/app'
import { render, h } from 'preact'

render(<App />, document.body, document.getElementById('app'))

const unregisterSW = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    registrations.forEach(sw => sw.unregister().then(console.log))
  }
}

unregisterSW()
