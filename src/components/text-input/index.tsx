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
    class={`${input} ${className}`}
    {...{ placeholder, type, value, onInput }}
  />
)

export default TextInput
