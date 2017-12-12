import { h } from 'preact'
import { main404 } from './style'

const Error404 = () => (
  <div class={main404}>
    <h1>ERROR 404</h1>
    <p>The requested file could not be found.</p>
    <video
      autoplay
      loop
      type="video/mp4"
      src="/assets/videos/burning_robot_404.mp4"
    />
  </div>
)

export default Error404
