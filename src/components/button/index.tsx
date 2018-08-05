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

const Button = ({
  children,
  href,
  type,
  value,
  onClick,
  disabled,
  class: className
}: ButtonProps) =>
  h(href ? 'a' : 'button', {
    class: `${style.button} ${className || ''}`,
    children,
    href,
    type,
    value,
    onClick,
    disabled
  })

export default Button
