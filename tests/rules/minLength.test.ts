import { minLength } from '../../src/rules'

jest.mock('../../src/index', () => ({
  t: (term, { length }) => `${term}. ${length}`
}))

const KEY = 'min length'
const MIN_LENGTH = 5
const ERROR = `min length. ${MIN_LENGTH}`

describe('Rules - minLength', () => {
  test('should return an error', () => {
    const actual = minLength(MIN_LENGTH, KEY)({
      value: '1234'
    })
    expect(actual).toEqual(ERROR)
  })
  test('should return no error', () => {
    const actual = minLength(MIN_LENGTH, KEY)({
      value: '12345'
    })
    expect(actual).toEqual(undefined)
  })
})
