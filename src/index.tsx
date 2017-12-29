import App from './components/app'
import { render, h } from 'preact'

render(<App />, document.body, document.getElementById('app'))

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error)
}
