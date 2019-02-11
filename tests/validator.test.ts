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

  test('with array', () => {
    const step1: any = {
      name: '',
      address: {
        street: '',
        city: 'Saigon'
      },
      moreInfo: {
        age: 18,
        occupation: 'Programmer'
      },
      identities: [
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: 'Ngo Thanh Tai'
        },
        {
          id: 'B9891605',
          name: ''
        },
        {
          id: '024179423',
          name: 'Ngo Thanh Tai'
        }
      ]
    }

    const validate = validator({
      name: [required('name is required')],
      address: {
        street: [required('street is required')]
      },
      identities: {
        id: [required('id is required')],
        name: [required('id name is required')]
      },
      moreInfo: {
        age: [required('age is required')],
        occupation: [required('occupation is required')]
      }
    })
    const props = {}
    expect(validate(step1, props)).toEqual({
      name: 'name is required',
      address: {
        street: 'street is required'
      },
      identities: [
        {
          id: 'id is required',
          name: 'id name is required'
        },
        {
          id: 'id is required'
        },
        {
          name: 'id name is required'
        },
        {}
      ]
    })
  })
})
