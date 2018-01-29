import { h } from 'preact'
import { toggle } from './style.sss'

const Toggle = ({
  onChange,
  id,
  checked
}: {
  onChange: JSX.GenericEventHandler
  id: string
  checked?: boolean
}) => (
  <div class={toggle}>
    <input id={id} type="checkbox" onChange={onChange} checked={checked} />
    <label for={id} />
  </div>
)

export default Toggle
