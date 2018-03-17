import { capitalize, compareMatchKey, parseMatch } from './utils'

test('capitalize', () => {
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('HELLO')).toEqual('HELLO')
})

test('compareMatchKey', () => {
  // -1 means a goes first
  expect(compareMatchKey('2018orwil_qm1', '2018orwil_qf1m1')).toEqual(-1)
})
