import { maxLength } from '../../src/rules'

jest.mock('../../src/index', () => ({
  t: (term, { length }) => `${term}. ${length}`
}))

const KEY = 'max length'
const ERROR = `max length. 8`

describe('Rules - maxLength', () => {
  test('should return error', () => {
    const actual = maxLength(8, KEY)({
      value: '123456789'
    })
    expect(actual).toEqual(ERROR)
  })
  test('should return no error', () => {
    const actual = maxLength(8, KEY)({
      value: '12345678'
    })
    expect(actual).toEqual(undefined)
  })
})
