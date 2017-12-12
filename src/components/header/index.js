import { h } from 'preact'
import { header } from './style'
import Icon from '../icon'

const Header = ({ title, back = '..' }) => (
  <header class={header}>
    <a href={back}>
      <Icon icon="left" />
    </a>
    <h1>{title}</h1>
  </header>
)

export default Header
