import { getFieldProps } from '../src/utils'

describe('Utils', () => {
  describe('getFieldProps', () => {
    test('should return expected props', () => {
      const props = {
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
      const newProps = getFieldProps(props, 'email')
      expect(newProps.value).toEqual('foobar@gmail.com')
      expect(newProps.touched).toEqual(false)
      expect(newProps.error).toEqual('')
    })
  })
})
