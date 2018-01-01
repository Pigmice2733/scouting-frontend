import { h } from 'preact'
import { icon as iconClass } from './style.sss'

const icons: { [key: string]: string } = {
  left:
    'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
  check: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  right:
    'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
  calendar:
    'M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z'
}

interface IconProps {
  icon: string
  fill?: string
}

const Icon = ({ icon, fill = 'white' }: IconProps) => (
  <svg class={iconClass} viewBox="0 0 24 24">
    <path fill={fill} d={icons[icon]} />
  </svg>
)

export default Icon