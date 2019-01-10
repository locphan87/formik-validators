import { minLength } from '../../src/rules'

jest.mock('../../src/index', () => ({
  t: (term, { length }) => `${term}. ${length}`
}))

const KEY = 'min length'
const ERROR = `min length. 5`

describe('Rules - minLength', () => {
  test('should return error', () => {
    const actual = minLength(5, KEY)({
      value: '1234'
    })
    expect(actual).toEqual(ERROR)
  })
  test('should return no error', () => {
    const actual = minLength(5, KEY)({
      value: '12345'
    })
    expect(actual).toEqual(undefined)
  })
})
