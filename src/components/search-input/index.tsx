import { h } from 'preact'
import { input } from './style.sss'

interface SearchInputEventTarget extends EventTarget {
  value: string
}

export interface SearchInputEvent extends Event {
  target: SearchInputEventTarget
}

interface SearchInputEventCallback {
  (event: SearchInputEvent): any
}

interface SearchInputProps {
  onInput?: SearchInputEventCallback
  placeholder?: string
  type?: string
  value?: string
}

const SearchInput = ({
  placeholder,
  type,
  value,
  onInput
}: SearchInputProps) => (
  <input class={input} {...{ placeholder, type, value, onInput }} />
)

export default SearchInput
