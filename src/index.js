import App from './components/app'
import { render, h } from 'preact'

render(<App />, document.body, document.getElementById('app'))

const unregiesterSW = async () => {
  if ('serviceWorker' in navigator) {
    ;(await navigator.serviceWorker.getRegistrations()).forEach(sw =>
      sw.unregister().then(console.log)
    )
  }
}

unregiesterSW()

if (module.hot) {
  module.hot.accept()
}
