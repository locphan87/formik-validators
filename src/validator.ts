import {
  compose,
  keys,
  head,
  is,
  map,
  filter
} from 'ramda'
import { isString } from 'ramda-adjunct'

type RuleInput = {
  value: string,
  values: object,
  props: object
}
type RuleOutput = string | void
type RuleFn = (ruleInput: RuleInput) => RuleOutput
type Config = {
  [fieldName: string]: RuleFn[]
}

const validator = (config: Config) => (values: object, props: object) =>
  keys(config).reduce((errors, fieldName) => {
    const ruleInput: RuleInput = {
      value: values[fieldName],
      values,
      props
    }
    const firstError = compose(
      // @ts-ignore
      head,
      filter(isString),
      map((rule: RuleFn): RuleOutput => rule(ruleInput))
    )(config[fieldName])

    if (firstError) {
      errors[fieldName] = firstError
    }

    return errors
  }, {})

export { RuleInput, RuleOutput, RuleFn }
export default validator
