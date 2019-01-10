import { getIn } from 'formik'
import { compose, keys, head, is, map, filter, path, split } from 'ramda'
import { isString } from 'ramda-adjunct'

type Values = {
  [fieldName: string]: string
}
type RuleInput = {
  value: string
  values: Values
  props: object
}
type RuleOutput = string | void
type RuleFn = (ruleInput: RuleInput) => RuleOutput
type Config = {
  [fieldName: string]: RuleFn[]
}
const validator = (config: Config) => (values: Values, props: object) =>
  keys(config).reduce((errors, fieldName) => {
    const ruleInput: RuleInput = {
      values,
      props,
      value: getIn(values, String(fieldName))
    }
    const firstError = compose(
      // @ts-ignore
      head,
      // @ts-ignore
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
