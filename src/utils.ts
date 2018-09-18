import { pick } from 'ramda'

const getFieldProps = pick([
  'values',
  'errors',
  'touched',
  'handleChange',
  'handleBlur'
])

export { getFieldProps }
