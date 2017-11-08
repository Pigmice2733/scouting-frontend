import { h } from 'preact'

export default ({ eventId }) => (
  <div>
    <h1>ERROR 404</h1>
    <p>The requested file could not be found.</p>
    <video autoplay loop type="video/mp4" src="/assets/videos/burning_robot_404.mp4" />
  </div>
)
