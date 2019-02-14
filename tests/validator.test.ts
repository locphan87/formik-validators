import validator from '../src/validator'

import { required, minLength, maxLength } from '../src/rules'

describe('Validator', () => {
  const props = {}
  test('should return first error', () => {
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
          name: '',
          dob: '19/12/1989'
        },
        {
          id: '',
          name: 'Walter',
          dob: ''
        },
        {
          id: 'B9891605',
          name: '',
          dob: '19/12/1989'
        },
        {
          id: '024179423',
          name: 'Ngo Thanh Tai',
          dob: ''
        }
      ],
      checkboxes: [
        {
          checkbox: {
            text: '',
            value: ''
          }
        }
      ],
      checkboxes2: [
        {
          checkbox: {
            text: [
              {
                text1: ''
              }
            ],
            value: {
              value1: '',
              value2: ''
            }
          }
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
      },
      checkboxes: {
        checkbox: {
          text: [required('text 1 is required')],
          value: [required('value 1 is required')]
        }
      },
      checkboxes2: {
        checkbox: {
          text: {
            text1: [required('text 1 is required')]
          },
          value: {
            value1: [required('value 1 is required')],
            value2: [required('value 2 is required')]
          }
        }
      }
    })
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
      ],
      checkboxes: [
        {
          checkbox: {
            text: 'text 1 is required',
            value: 'value 1 is required'
          }
        }
      ],
      checkboxes2: [
        {
          checkbox: {
            text: [
              {
                text1: 'text 1 is required'
              }
            ],
            value: {
              value1: 'value 1 is required',
              value2: 'value 2 is required'
            }
          }
        }
      ]
    })
  })

  test('config and values are different', () => {
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
          name: '',
          dob: ''
        },
        {
          id: '',
          name: 'Ngo Thanh Tai',
          dob: '19/12/1989'
        },
        {
          id: 'B9891605',
          name: '',
          dob: ''
        },
        {
          id: '024179423',
          name: 'Ngo Thanh Tai',
          dob: '19/12/1989'
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
