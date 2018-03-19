import { h } from 'preact'
import { route } from 'preact-router'
import Icon from '../icon'
import { back as backClass, header } from './style.sss'

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
        onClick={e => {
          if (verify === true) {
            e.stopImmediatePropagation()
            e.preventDefault()
            if (confirm('Are you sure you want to leave?')) {
              route(back)
            }
          }
        }}
        href={back}
      >
        <Icon icon="left" />
      </a>
    )}
    {contents || <h1>{title}</h1>}
  </header>
)

export default Header
