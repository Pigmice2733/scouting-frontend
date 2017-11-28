import { h } from 'preact'
import style from './style'

export default ({ eventId }) => (
  <div class={style.main404}>
    <h1>ERROR 404</h1>
    <p>The requested file could not be found.</p>
    <video autoplay loop type="video/mp4" src="/assets/videos/burning_robot_404.mp4" />
  </div>
)
