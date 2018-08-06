import { h, ComponentChildren } from 'preact'
import style from './style.css'

interface ButtonProps {
  children?: ComponentChildren
  href?: string
  type?: string
  value?: string
  onClick?: () => any
  disabled?: boolean
  class?: string
}

const Button = (props: ButtonProps) => {
  const El = props.href ? 'a' : 'button'
  return <El class={`${style.button} ${props.class || ''}`} {...props} />
}

export default Button
