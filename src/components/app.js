import { h } from 'preact'
import { Router } from 'preact-router'

import Home from '../routes/home'
import Error404 from '../routes/404'

export default () => (
  <div id="app">
    <Router>
      <Home path="/" />
      <Error404 default />
    </Router>
  </div>
)
