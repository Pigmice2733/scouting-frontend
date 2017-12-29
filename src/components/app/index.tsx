import { h } from 'preact'
import { Router, Route } from 'preact-router'
import { app } from './style.sss'

import Home from '../../routes/home'
import Event from '../../routes/event'
import Match from '../../routes/match'
import Error404 from '../../routes/404'

const App = () => (
  <div id={app}>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/events/:eventId" component={Event} />
      <Route path="/events/:eventId/:matchId" component={Match} />
      <Route default component={Error404} />
    </Router>
  </div>
)

export default App
