import { h, render } from 'preact'
import testUtils from 'test-utils'
import NumberPicker from '.'

test('renders', () => {
  const cb = jest.fn()
  const tree = testUtils<HTMLDivElement>(
    <NumberPicker id="asdf" onChange={cb} />
  )
  expect(tree).toMatchSnapshot()
  const [decrementButton, incrementButton] = Array.from(
    tree.querySelectorAll('button')
  )
  const input = tree.querySelector('input')
  expect(cb).not.toHaveBeenCalled()
  incrementButton.click()
  expect(cb).toHaveBeenLastCalledWith(1)
  decrementButton.click()
  decrementButton.click()
  expect(cb).toHaveBeenLastCalledWith(-1)
  input.value = '500'
  input.dispatchEvent(new Event('input'))
  expect(cb).toHaveBeenLastCalledWith(500)
  expect(cb).toHaveBeenCalledTimes(4)
})
