import { h } from 'preact'
import { header, back as backClass } from './style.sss'
import Icon from '../icon'
import { route } from 'preact-router'

interface HeaderProps {
  title?: string
  back?: string
  contents?: any
  verify?: boolean
}

const Header = ({ title, back, contents, verify }: HeaderProps) => (
  <header class={header}>
    {back && (
      <a
        class={backClass}
        onClick={() =>
          !verify || confirm('Are you sure you want to leave?')
            ? route(back)
            : null
        }
        href="#"
      >
        <Icon icon="left" />
      </a>
    )}
    {contents || <h1>{title}</h1>}
  </header>
)

export default Header
