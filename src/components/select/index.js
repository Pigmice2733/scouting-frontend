import { h } from 'preact'
import { selectClass } from './style'

const Select = ({ options, onChange }) => (
  <select class={selectClass} onChange={onChange}>
    {options}
  </select>
)

export default Select
