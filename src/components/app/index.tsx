import { h } from 'preact'
import { Route, Router } from 'preact-router'
import { app } from './style.sss'

import Error404 from '../../routes/404'
import Admin from '../../routes/admin'
import AllianceAnalysis from '../../routes/analysis/alliance'
import EventAnalysis from '../../routes/analysis/event'
import TeamAnalysis from '../../routes/analysis/team'
import Compare from '../../routes/compare'
import Event from '../../routes/event'
import Home from '../../routes/home'
import Leaderboard from '../../routes/leaderboard'
import Login from '../../routes/login'
import Match from '../../routes/match'
import Print from '../../routes/print'
import Scout from '../../routes/scout'

const App = () => (
  <div id={app}>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/events/:eventId" component={Event} />
      <Route path="/events/:eventId/analysis" component={EventAnalysis} />
      <Route path="/events/:eventId/team/:team" component={TeamAnalysis} />
      <Route path="/events/:eventId/:matchId" component={Match} />
      <Route path="/events/:eventId/:matchId/print" component={Print} />
      <Route
        path="/events/:eventId/:matchId/alliance/:color"
        component={AllianceAnalysis}
      />
      <Route path="/events/:eventId/:matchId/scout" component={Scout} />
      <Route
        path="/events/:eventId/compare/:team1?/:team2?"
        component={Compare}
      />
      <Route default component={Error404} />
    </Router>
  </div>
)

export default App
