import { h } from 'preact'
import { input } from './style.sss'

interface TextInputEventTarget extends EventTarget {
  value: string
}

export interface TextInputEvent extends Event {
  target: TextInputEventTarget
}

interface TextInputEventCallback {
  (event: TextInputEvent): any
}

interface TextInputProps {
  onInput?: TextInputEventCallback
  placeholder?: string
  type?: string
  value?: string
}

const TextInput = ({ placeholder, type, value, onInput }: TextInputProps) => (
  <input class={input} {...{ placeholder, type, value, onInput }} />
)

export default TextInput
