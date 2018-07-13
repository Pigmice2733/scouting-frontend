import {
  capitalize,
  compareMatchKey,
  formatMatchKey,
  lerp,
  lerper,
  parseMatchKey,
  hasValidJWT,
  formatTime,
  formatTeamNumber,
  parseTeamNumber,
  compareTeams,
  sortSchemaKeys,
  toRadians,
  distanceBetween,
  camelToTitle,
  toPercentage,
  toPrettyNumber,
  getNumber
} from './utils'

test('hasValidJWT', () => {
  expect(hasValidJWT('aslfj')).toEqual(false)
  expect(hasValidJWT(null)).toEqual(false)
  expect(hasValidJWT('foo.eyJleHAiOiAxMjMxMjQwMDIwMjM0MTM0fQ==.baz')).toEqual(
    true
  )
})

test('capitalize', () => {
  expect(capitalize('hello')).toEqual('Hello')
  expect(capitalize('HELLO')).toEqual('HELLO')
})

test('formatTime', () => {
  expect(formatTime(new Date('10:30 AM 05/12/2018'))).toEqual('10:30 AM')
  expect(formatTime(new Date('20:30 05/12/2018'))).toEqual('8:30 PM')
})

test('formatTeamNumber', () => {
  expect(formatTeamNumber('frc2344a')).toEqual('2344a')
  expect(formatTeamNumber('frc2733')).toEqual('2733')
})

test('parseTeamNumber', () => {
  expect(parseTeamNumber('frc2912a')).toEqual({ letter: 'a', num: 2912 })
})

test('compareTeams', () => {
  expect(compareTeams('frc2345a', 'frc823')).toBeGreaterThan(0)
  expect(compareTeams('frc823', 'frc2345a')).toBeLessThan(0)
  expect(compareTeams('frc8234a', 'frc2345')).toBeGreaterThan(0)
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

test('sortSchemaKeys', () => {
  expect(
    sortSchemaKeys([
      'teleopFooBar',
      'teleopFoo',
      'autoFooBar',
      'askjdfalskdfsaf',
      'autoBarBaz'
    ])
  ).toMatchSnapshot()
  expect(
    sortSchemaKeys([
      'sldkfaskldfasd',
      'teleopFoo',
      'autoFooBar',
      'askjdfalskdfsaf',
      'autoBarBaz'
    ])
  ).toMatchSnapshot()
})

test('toRadians', () => {
  expect(toRadians(360)).toEqual(2 * Math.PI)
  expect(toRadians(0)).toEqual(0)
  expect(toRadians(180)).toEqual(Math.PI)
})

test('distanceBetween', () => {
  expect(
    distanceBetween(45.4984831, -122.6407657, 45.6122938, -122.4003979)
  ).toBeCloseTo(22.59)
})

test('camelToTitle', () => {
  expect(camelToTitle('thisIsATitle')).toEqual('This Is A Title')
})

test('toPercentage', () => {
  expect(toPercentage(100)).toEqual('10000%')
  expect(toPercentage(1)).toEqual('100%')
  expect(toPercentage(1.246)).toEqual('125%')
  expect(toPercentage(0.03)).toEqual('3%')
  expect(toPercentage(0)).toEqual('0%')
  expect(toPercentage(0.001)).toEqual('0%')
})

test('toPrettyNumber', () => {
  expect(toPrettyNumber(100)).toEqual(100)
  expect(toPrettyNumber(30.15312)).toEqual(30.2)
  expect(toPrettyNumber(Math.PI)).toEqual(3.1)
})

test('getNumber', () => {
  expect(getNumber(5)).toEqual(5)
  expect(getNumber(false)).toEqual(0)
  expect(getNumber(true)).toEqual(1)
})
