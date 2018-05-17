import { h } from 'preact'
import testUtils from 'test-utils'
import Button from '.'

test('triggers cb', () => {
  const cb = jest.fn()
  const button = testUtils<HTMLButtonElement>(<Button onClick={cb} />)
  expect(cb).not.toHaveBeenCalled()
  button.click()
  expect(cb).toHaveBeenCalled()
})

test('uses an `a` for `href`', () => {
  expect(testUtils(<Button href="google.com">Hello</Button>)).toMatchSnapshot()
})

test('uses an `button` otherwise', () => {
  expect(
    testUtils(
      <Button type="foo" value="hello" disabled>
        Hello
      </Button>
    )
  ).toMatchSnapshot()
})
