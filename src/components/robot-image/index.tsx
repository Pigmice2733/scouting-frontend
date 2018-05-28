import { h } from 'preact'
import style from './style.css'

interface RobotImageProps {
  team: string
  color: string
  className?: string
  key?: string
}

const RobotImage = ({ className, team, color = 'blue' }: RobotImageProps) => (
  <div
    class={`${className} ${style.robotImage} ${
      color === 'blue' ? style.blue : style.red
    }`}
    style={{
      backgroundImage: `url(https://api.pigmice.ga/photo/frc${team}), url(/assets/imgs/robot.jpg)`
    }}
  >
    <span>{team}</span>
  </div>
)

export default RobotImage
