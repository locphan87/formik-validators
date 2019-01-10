import { isEmptyString, isString, isNilOrEmpty } from 'ramda-adjunct'

import { t } from './../index'
import { RuleFn, RuleInput } from '../../typings'

const required = (errorKey: string): RuleFn => ({
  value,
  values,
  props
}: RuleInput) => {
  if (isNilOrEmpty(value)) return t(errorKey)
  if (isString(value) && isEmptyString(value.trim())) return t(errorKey)
}

export { required }
