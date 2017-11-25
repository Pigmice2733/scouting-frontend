import { h } from 'preact'
import style from './style'

const Button = ({ children, ...props }) => (
  <a class={style.button} {...props}>
    {children}
  </a>
)

export default Button
