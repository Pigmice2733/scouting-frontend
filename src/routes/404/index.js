import { h } from 'preact'
import style from './style'

export default ({ eventId }) => (
  <div class={style.home}>
    <h1>ERROR 404</h1>
    <h3>The requested file could not be found.</h3>
    <br />
    <div style="text-align: center;">
        <video width="400" autoplay loop type="video/mp4" src="/assets/videos/burning_robot_404.mp4" />
    </div>
  </div>
)
