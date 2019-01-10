import { isNil, curry } from 'ramda'

import { t } from './../index'
import { RuleFn, RuleInput } from '../../typings'

const minLength = curry(
  (length: number, errorKey: string): RuleFn => ({
    value,
    values,
    props
  }: RuleInput) => {
    if (isNil(value)) return
    if (value.length < length) return t(errorKey, { length })
  }
)

export { minLength }
