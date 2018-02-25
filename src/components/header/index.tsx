import { h, Component } from 'preact'
import { header, back as backClass } from './style.sss'
import Icon from '../icon'

interface HeaderState {}

interface HeaderProps {
  title?: string
  back?: string
  contents?: any
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor() {
    super()
    this.state = { isOpen: false }
  }

  render({ title, back, contents }: HeaderProps, {  }: HeaderState) {
    return (
      <header class={header}>
        {back && (
          <a class={backClass} href={back}>
            <Icon icon="left" />
          </a>
        )}
        {contents || <h1>{title}</h1>}
      </header>
    )
  }
}

export default Header
