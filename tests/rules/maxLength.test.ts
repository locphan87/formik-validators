import { maxLength } from '../../src/rules'

jest.mock('../../src/index', () => ({
  t: (term, { length }) => `${term}. ${length}`
}))

const KEY = 'max length'
const MAX_LENGTH = 8
const ERROR = `max length. ${MAX_LENGTH}`

describe('Rules - maxLength', () => {
  test('should return an error', () => {
    const actual = maxLength(MAX_LENGTH, KEY)({
      value: '123456789'
    })
    expect(actual).toEqual(ERROR)
  })
  test('should return no error', () => {
    const actual = maxLength(MAX_LENGTH, KEY)({
      value: '12345678'
    })
    expect(actual).toEqual(undefined)
  })
})
