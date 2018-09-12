import { h } from 'preact'
import { route } from 'preact-router'
import Icon from '../icon'
import style from './style.css'

interface HeaderProps {
  title?: string
  back?: string
  contents?: any
  verify?: boolean
}

const Header = ({ title, back, contents, verify }: HeaderProps) => (
  <header class={style.header}>
    {back && (
      <a
        class={style.back}
        aria-label="Back"
        onClick={(e: Event) => {
          if (verify === false) return
          e.stopImmediatePropagation()
          e.preventDefault()
          if (confirm('Are you sure you want to leave?')) {
            route(back)
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
