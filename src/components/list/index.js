import { h } from 'preact'
import { list } from './style'

const List = ({ children }) => <ul class={list}>{children}</ul>

export default List
