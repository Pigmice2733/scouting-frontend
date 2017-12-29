import { h } from 'preact'
import { header } from './style.sss'
import Icon from '../icon'

interface HeaderProps {
  title: string
  back?: string
}

const Header = ({ title, back = '..' }: HeaderProps) => (
  <header class={header}>
    <a href={back}>
      <Icon icon="left" />
    </a>
    <h1>{title}</h1>
  </header>
)

export default Header
