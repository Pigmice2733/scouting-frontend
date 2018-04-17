import { h } from 'preact'
import { button } from './style.sss'

interface ButtonProps {
  children?: JSX.Element[]
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
  h(href ? 'a' : type === 'submit' ? 'input' : 'button', {
    class: `${button} ${className || ''}`,
    children,
    href,
    type,
    value,
    onClick,
    disabled
  })

export default Button
