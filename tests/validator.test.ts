import validator from '../src/validator'
import { required, minLength, maxLength } from '../src/rules'

describe('Validator', () => {
  test('should return first error', () => {
    const props = {}
    const actual = validator({
      email: [required('email is required')],
      phone: [
        minLength(8, 'phone needs at least 8 digits'),
        maxLength(10, 'phone cannot exceed 10 digits')
      ]
    })
    expect(
      actual(
        {
          email: ''
        },
        props
      )
    ).toEqual({ email: 'email is required' })
    expect(
      actual(
        {
          email: 'foobar@gmail.com',
          phone: '123'
        },
        props
      )
    ).toEqual({ phone: 'phone needs at least 8 digits' })
    expect(
      actual(
        {
          email: 'foobar@gmail.com',
          phone: '12356789012'
        },
        props
      )
    ).toEqual({ phone: 'phone cannot exceed 10 digits' })
  })
})
