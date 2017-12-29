import { h } from 'preact'
import { button } from './style.sss'

interface ButtonProps {
  children?: JSX.Element[]
  href: string
}

const Button = ({ children, ...props }: ButtonProps) => (
  <a class={button} {...props}>
    {children}
  </a>
)

export default Button
