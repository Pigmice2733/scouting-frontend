import { h } from 'preact'
import { selectClass } from './style.sss'

interface SelectProps {
  options: any[]
  onChange: (Event) => any
}

const Select = ({ options, onChange }: SelectProps) => (
  <select class={selectClass} onChange={onChange}>
    {options}
  </select>
)

export default Select
