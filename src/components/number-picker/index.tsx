import { Component, h } from 'preact'
import TextInput from '../text-input'
import style from './style.sss'

interface NumberProps {
  id: string
  onChange: (v: number) => any
  value?: number
}

interface NumberState {
  num: number
}

class NumberPicker extends Component<NumberProps, NumberState> {
  constructor({ num = 0 }) {
    super()
    this.state = { num }
  }

  increment = () => {
    this.setState((state: NumberState) => {
      this.props.onChange(++state.num)
      return state
    })
  }

  onInput = (e: { target: EventTarget }) => {
    const value = Number((e.target as HTMLInputElement).value)
    this.props.onChange(value)
    this.setState({ num: value })
  }

  decrement = () => {
    this.setState((state: NumberState) => {
      this.props.onChange(--state.num)
      return state
    })
  }

  render({ id, onChange }: NumberProps, { num }: NumberState) {
    return (
      <div class={style.numberPicker}>
        <button onClick={this.decrement}>-</button>
        <TextInput type="number" onInput={this.onInput} value={String(num)} />
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}

export default NumberPicker
