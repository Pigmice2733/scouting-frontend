import { h } from 'preact'
import { Router, Route } from 'preact-router'
import { app } from './style.sss'

import Home from '../../routes/home'
import Login from '../../routes/login'
import Admin from '../../routes/admin'
import Event from '../../routes/event'
import Match from '../../routes/match'
import AllianceAnalysis from '../../routes/analysis/alliance'
import EventAnalysis from '../../routes/analysis/event'
import Error404 from '../../routes/404'
import Scout from '../../routes/scout'

const App = () => (
  <div id={app}>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/events/:eventId" component={Event} />
      <Route path="/events/:eventId/analysis" component={EventAnalysis} />
      <Route path="/events/:eventId/:matchId" component={Match} />
      <Route
        path="/events/:eventId/:matchId/alliance/:color"
        component={AllianceAnalysis}
      />
      <Route path="/events/:eventId/:matchId/scout" component={Scout} />
      <Route default component={Error404} />
    </Router>
  </div>
)

export default App
