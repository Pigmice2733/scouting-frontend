import { capitalize, compareMatchKey, parseMatch } from './utils'

test('capitalize', () => {
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('HELLO')).toEqual('HELLO')
})

const matchKeys = [
  ['2018test_qm1', '2018test_qm37'],
  ['2018test_qm5', '2018test_sf1m1'],
  ['2018test_sf1m1', '2018test_sf1m2'],
  ['2018test_sf1m3', '2018test_f1m1'],
  ['2018test_qm1', '2018test_qm1']
]

test('compareMatchKey', () => {
  // -1 means a goes first
  matchKeys.forEach(([a, b]) => {
    if (a === b) {
      expect(compareMatchKey(a, b)).toEqual(0)
      return
    }
    expect(compareMatchKey(a, b)).toEqual(-1)
    expect(compareMatchKey(b, a)).toEqual(1)
  })
})
