import { h } from 'preact'
import { button } from './style.sss'

interface ButtonProps {
  children?: JSX.Element[]
  href?: string
  type?: 'submit' | null
  value?: string
  onClick?: () => any
  class?: string
}

const Button = ({
  children,
  href,
  type,
  value,
  onClick,
  class: className
}: ButtonProps) =>
  h(href ? 'a' : type === 'submit' ? 'input' : 'button', {
    class: `${button} ${className || ''}`,
    children,
    href,
    type,
    value,
    onClick
  })

export default Button
