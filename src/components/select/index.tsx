import { h } from 'preact'
import { selectClass } from './style.css'

interface SelectProps {
  options: any[]
  onChange: (Event) => any
}

const Select = ({ options, onChange }: SelectProps) => (
  <select class={selectClass} onBlur={onChange}>
    {options}
  </select>
)

export default Select
