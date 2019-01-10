import validator from '../src/validator'
import { required, minLength, maxLength } from '../src/rules'

describe('Validator', () => {
  test('should return first error', () => {
    const props = {}
    const validate = validator({
      email: [required('email is required')],
      phone: [
        minLength(8, 'phone number must be at least 8 digits'),
        maxLength(10, 'phone number cannot exceed 10 digits')
      ]
    })
    expect(
      validate(
        {
          email: ''
        },
        props
      )
    ).toEqual({ email: 'email is required' })
    expect(
      validate(
        {
          email: 'foobar@gmail.com',
          phone: '123'
        },
        props
      )
    ).toEqual({ phone: 'phone number must be at least 8 digits' })
    expect(
      validate(
        {
          email: 'foobar@gmail.com',
          phone: '12356789012'
        },
        props
      )
    ).toEqual({ phone: 'phone number cannot exceed 10 digits' })
  })
})
