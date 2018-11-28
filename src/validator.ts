import {
  compose,
  keys,
  head,
  is,
  map,
  filter,
  path,
  split
} from 'ramda'
import { isString } from 'ramda-adjunct'

type RuleInput = {
  value: string | undefined,
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
      values,
      props,
      value: path(split(/\]?\.|\[/, String(fieldName)), values)
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
