import { h } from 'preact'
import { header } from './style.sss'
import Icon from '../icon'

interface HeaderProps {
  title?: string
  back?: string
  contents?: any
}

const Header = ({ title, back, contents }: HeaderProps) => (
  <header class={header}>
    {back && (
      <a href={back}>
        <Icon icon="left" />
      </a>
    )}
    {contents || <h1>{title}</h1>}
  </header>
)

export default Header
