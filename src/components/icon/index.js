import { h } from 'preact'

const icons = {
  left:
    'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
  check: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  right:
    'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
}

const Icon = ({ icon, fill }) => (
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill={fill || 'white'} d={icons[icon]} />
  </svg>
)

export default Icon
