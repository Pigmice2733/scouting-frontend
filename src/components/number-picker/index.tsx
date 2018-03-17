import { h, Component } from 'preact'
import TextInput from '../text-input'
import { numberPicker } from './style.sss'

interface NumberProps {
  id: string
  onChange: (v: number) => any
  value?: number
}

interface NumberState {
  number: number
}

class NumberPicker extends Component<NumberProps, NumberState> {
  constructor({ number = 0 }) {
    super()
    this.state = { number }
  }

  increment = () => {
    this.setState((state: NumberState) => {
      this.props.onChange(++state.number)
      return state
    })
  }

  onInput = (e: { target: EventTarget }) => {
    const value = Number((e.target as HTMLInputElement).value)
    this.props.onChange(value)
    this.setState({ number: value })
  }

  decrement = () => {
    this.setState((state: NumberState) => {
      this.props.onChange(--state.number)
      return state
    })
  }

  render({ id, onChange }: NumberProps, { number }: NumberState) {
    return (
      <div class={numberPicker}>
        <button onClick={this.decrement}>-</button>
        <TextInput
          type="number"
          onInput={this.onInput}
          value={String(number)}
        />
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}

export default NumberPicker
