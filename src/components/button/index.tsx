import { h } from 'preact'
import { button } from './style.sss'

interface ButtonProps {
  children?: JSX.Element[]
  href?: string
  type?: 'submit' | null
  value?: string
  onClick?: () => any
  disabled?: boolean
}

const Button = ({
  children,
  href,
  type,
  value,
  onClick,
  disabled
}: ButtonProps) =>
  h(href ? 'a' : type === 'submit' ? 'input' : 'button', {
    class: button,
    children,
    href,
    type,
    value,
    onClick,
    disabled
  })

export default Button
