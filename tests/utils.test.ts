import { getFieldProps } from '../src/utils'

describe('Utils', () => {
  describe('getFieldProps', () => {
    test('should return correct props', () => {
      const data = {
        values: {
          email: 'foobar@gmail.com'
        },
        touched: {
          email: false
        },
        errors: {},
        setFieldValue: jest.fn(),
        handleBlur: jest.fn(),
        handleChange: jest.fn()
      }
      const actual = getFieldProps(data, 'email')
      expect(actual.value).toEqual('foobar@gmail.com')
      expect(actual.touched).toEqual(false)
      expect(actual.error).toEqual('')
    })
  })
})
