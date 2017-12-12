import { h } from 'preact'
import { button } from './style'

const Button = ({ children, ...props }) => (
  <a class={button} {...props}>
    {children}
  </a>
)

export default Button
