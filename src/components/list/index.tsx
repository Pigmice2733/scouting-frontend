import { h } from 'preact'
import { list } from './style.sss'

interface ListProps {
  children?: JSX.Element[]
}

const List = ({ children }: ListProps) => <ul class={list}>{children}</ul>

export default List
