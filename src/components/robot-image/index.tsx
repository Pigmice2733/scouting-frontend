import { h } from 'preact'
import { blue, red, robotImage } from './style.sss'

interface RobotImageProps {
  team: string
  color: string
  key: string
}

const RobotImage = ({ team, color = 'blue' }: RobotImageProps) => (
  <div
    class={`${robotImage} ${color === 'blue' ? blue : red}`}
    style={{
      backgroundImage: `url(https://api.pigmice.ga/photo/frc${team}), url(/assets/imgs/robot.jpg)`
    }}
  >
    <span>{team}</span>
  </div>
)

export default RobotImage
