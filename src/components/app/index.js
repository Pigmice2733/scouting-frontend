import { h } from 'preact'
import { Router } from 'preact-router'
import { app } from './style'

import Home from '../../routes/home'
import Event from '../../routes/event'
import Match from '../../routes/match'
import Error404 from '../../routes/404'

const App = () => (
  <div id={app}>
    <Router>
      <Home path="/" />
      <Event path="/events/:eventId" />
      <Match path="/events/:eventId/:matchId" />
      <Error404 default />
    </Router>
  </div>
)

export default App
