import { h } from 'preact'
import style from './style.css'

interface TextInputEventTarget extends EventTarget {
  value: string
}

export interface TextInputEvent extends Event {
  target: TextInputEventTarget
}

type TextInputEventCallback = (event: TextInputEvent) => any

interface TextInputProps {
  onInput?: TextInputEventCallback
  placeholder?: string
  type?: string
  value?: string
  className?: string
}

const TextInput = ({
  placeholder,
  type,
  value,
  onInput,
  className
}: TextInputProps) => (
  <input
    class={`${style.input} ${className}`}
    {...{ placeholder, type, value, onInput }}
  />
)

export default TextInput
