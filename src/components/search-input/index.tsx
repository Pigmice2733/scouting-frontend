import { h } from 'preact'
import style from './style.css'

interface SearchInputEventTarget extends EventTarget {
  value: string
}

export interface SearchInputEvent extends Event {
  target: SearchInputEventTarget
}

type SearchInputEventCallback = (event: SearchInputEvent) => any

interface SearchInputProps {
  onInput?: SearchInputEventCallback
  placeholder?: string
  value?: string
}

const SearchInput = ({ placeholder, value, onInput }: SearchInputProps) => (
  <input
    class={style.input}
    type="search"
    {...{ placeholder, value, onInput }}
  />
)

export default SearchInput
