import { h } from 'preact'
import { route } from 'preact-router'
import Icon from '../icon'
import { back as backClass, header } from './style.sss'

interface HeaderProps {
  title?: string
  contents?: any
  verify?: boolean
  noBack?: boolean
  back?: () => any
}

const Header = ({ title, contents, verify, back, noBack }: HeaderProps) => (
  <header class={header}>
    {noBack || (
      <a
        class={backClass}
        onClick={e => {
          if (verify === true) {
            e.stopImmediatePropagation()
            e.preventDefault()
            if (confirm('Are you sure you want to leave?')) {
              if (back !== undefined) {
                back()
              }
              window.history.back()
            }
          } else {
            if (back !== undefined) {
              back()
            }
            window.history.back()
          }
        }}
        href="#"
      >
        <Icon icon="left" />
      </a>
    )}

    {contents || <h1>{title}</h1>}
  </header>
)

export default Header
