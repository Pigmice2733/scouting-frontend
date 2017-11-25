import { h } from 'preact'
import style from './style'

const RobotImage = ({ team, year, color = 'blue', ...foo }) => (
  <div class={`${style.robotImage} ${style[color]}`} {...foo}>
    <span>{team}</span>
  </div>
)

export default RobotImage
