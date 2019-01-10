import { required } from '../../src/rules'

describe('Rules - required', () => {
  test('should return an error', () => {
    const actual = required('required')({
      value: ''
    })
    expect(actual).toEqual('required')
  })
  test('should return no error', () => {
    const actual = required('required')({
      value: 'foo bar'
    })
    expect(actual).toEqual(undefined)
  })
})
