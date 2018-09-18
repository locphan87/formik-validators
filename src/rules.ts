import { isNil, curry } from 'ramda'
import { isEmptyString, isString, isNilOrEmpty } from 'ramda-adjunct'

import { t } from './index'
import { RuleFn } from './validator'

const required = (errorKey: string): RuleFn => ({ value, values, props }) => {
  if (isNilOrEmpty(value)) return t(errorKey)
  if (isString(value) && isEmptyString(value.trim())) return t(errorKey)
}
const minLength = curry(
  (length: number, errorKey: string): RuleFn => ({ value, values, props }) => {
    if (isNil(value)) return
    if (value.length < length) return t(errorKey, { length })
  }
)
const maxLength = curry(
  (length: number, errorKey: string): RuleFn => ({ value, values, props }) => {
    if (isNil(value)) return
    if (value.length > length) return t(errorKey, { length })
  }
)

export { required, minLength, maxLength }
