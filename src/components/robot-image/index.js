import { h } from 'preact'
import { robotImage, blue, red } from './style'

const RobotImage = ({ team, color = 'blue', ...foo }) => (
  <div class={`${robotImage} ${color === 'blue' ? blue : red}`} {...foo}>
    <span>{team}</span>
  </div>
)

export default RobotImage
