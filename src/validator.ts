import { getIn } from 'formik'
import { assoc, compose, keys, head, map, filter } from 'ramda'
import { isNonEmptyString } from 'ramda-adjunct'

import { Config, RuleInput, RuleOutput, RuleFn, FormValues } from '../typings'

const validator = (config: Config) => (values: FormValues, props: any) =>
  keys(config).reduce((errors, _fieldName) => {
    const fieldName = String(_fieldName)
    const ruleInput: RuleInput = {
      values,
      props,
      value: getIn(values, fieldName)
    }
    const firstError = compose(
      // @ts-ignore
      head,
      // @ts-ignore
      filter(isNonEmptyString),
      map((rule: RuleFn): RuleOutput => rule(ruleInput))
    )(config[fieldName])

    if (!firstError) return errors

    return assoc(fieldName, firstError, errors)
  }, {})

export default validator
