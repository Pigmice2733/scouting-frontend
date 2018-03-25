import {
  capitalize,
  compareMatchKey,
  parseMatchKey,
  formatMatchKey,
  lerp,
  lerper
} from './utils'

test('capitalize', () => {
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('HELLO')).toEqual('HELLO')
})

const matchKeys = [
  ['2018test_qm1', '2018test_qm37'],
  ['2018test_qm5', '2018test_sf1m1'],
  ['2018test_sf1m1', '2018test_sf1m2'],
  ['2018test_sf1m3', '2018test_f1m1'],
  ['2018test_qm1', '2018test_qm1'],
  ['2018test_qf1m1', '2018test_qf2m1'],
  ['2018test_qf3m1', '2018test_qf4m2'],
  ['2018test_qf3m2', '2018test_qf4m2'],
  ['2018test_qf1m1', '2018test_qf4m4'],
  ['2018test_qf2m1', '2018test_qf1m2']
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

test('parseMatchKey', () => {
  expect(parseMatchKey('2018orwil_qm1')).toEqual({
    eventKey: '2018orwil',
    matchKey: 'qm1',
    type: 'q',
    group: null,
    num: 1
  })
  expect(parseMatchKey('2018orwil_ef4m3')).toEqual({
    eventKey: '2018orwil',
    matchKey: 'ef4m3',
    type: 'ef',
    group: 4,
    num: 3
  })
  expect(parseMatchKey('2018orwil_qf3m2')).toEqual({
    eventKey: '2018orwil',
    matchKey: 'qf3m2',
    type: 'qf',
    group: 3,
    num: 2
  })
  expect(parseMatchKey('2018orwil_f3m2')).toEqual({
    eventKey: '2018orwil',
    matchKey: 'f3m2',
    type: 'f',
    group: 3,
    num: 2
  })
  expect(parseMatchKey('2018orwil_fm3m2')).toEqual({
    eventKey: '2018orwil',
    matchKey: 'fm3m2',
    type: 'fm',
    group: 3,
    num: 2
  })
})

test('formatMatchKey', () => {
  expect(formatMatchKey('2018orwil_f1m2')).toEqual('F1 M2')
  expect(formatMatchKey('2018orwil_qm1')).toEqual('Qual 1')
  expect(formatMatchKey('2018orwil_qf4m1')).toEqual('QF4 M1')
  expect(formatMatchKey('2018orwil_sf4m1')).toEqual('SF4 M1')
  expect(formatMatchKey('sf4m1')).toEqual('SF4 M1')
  expect(formatMatchKey('qm1')).toEqual('Qual 1')
})
