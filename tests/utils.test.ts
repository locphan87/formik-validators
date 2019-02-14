import {
  getFieldProps,
  removeListEmptyObjects,
  removeUndefinedValuesAndEmptyObjects
} from '../src/utils'

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

  test('removeListEmptyObjects', () => {
    const errors = {
      name: '',
      items: [{}, {}],
      validItems: [
        {
          items: [{}, {}]
        },
        {
          items: []
        }
      ]
    }
    expect(removeListEmptyObjects(errors)).toEqual({ name: '' })
  })

  test('removeUndefinedValuesAndEmptyObjects', () => {
    const values = {
      name: undefined,
      items1: [{ name: undefined }, { name: 'walter' }],
      items2: [{ name: 'walter 1' }, { name: 'walter 2' }],
      validItems: [
        {
          items: [{ name: undefined }, { name: 'walter' }]
        },
        {
          items: [{ name: 'ngo' }, { name: 'walter' }]
        }
      ],
      address: {
        street: undefined
      }
    }
    expect(removeUndefinedValuesAndEmptyObjects(values)).toEqual({
      items1: [{}, { name: 'walter' }],
      items2: [{ name: 'walter 1' }, { name: 'walter 2' }],
      validItems: [
        {
          items: [{}, { name: 'walter' }]
        },
        {
          items: [{ name: 'ngo' }, { name: 'walter' }]
        }
      ]
    })
  })
})
