import { capitalize, compareMatchKey, parseMatch, lerp, lerper } from './utils'

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

test('lerp', () => {
  expect(lerp(4, 2, 8, 3, 6)).toEqual(4)
  expect(lerp(-1, -3, 4, 1, 8)).toEqual(3)
})

test('lerper', () => {
  expect(lerper(2, 8, 3, 6)(4)).toEqual(4)
  expect(lerper(-3, 4, 1, 8)(-1)).toEqual(3)
})
