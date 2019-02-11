import { getIn } from 'formik'
import * as R from 'ramda'
import { isNonEmptyString, isArray, isObject } from 'ramda-adjunct'

import { Config, RuleInput, RuleFn, FormValues } from '../typings'

const runRule = (
  values: FormValues,
  props: any,
  formValue: any,
  validateConfig: any
) => {
  const ruleInput: RuleInput = {
    values,
    props,
    value: formValue
  }
  let errorMessage = undefined
  validateConfig.find(
    (rule: RuleFn): boolean => {
      errorMessage = rule(ruleInput)

      return isNonEmptyString(errorMessage)
    }
  )

  return errorMessage
}

const validate = (config: Config, values: FormValues, props: any): Object => {
  return R.compose(
    R.reduce((errors: Object, fieldName: string) => {
      const validateConfig: Config = getIn(config, fieldName)
      const value = getIn(values, fieldName)
      if (isArray(validateConfig)) {
        if (isArray(values)) {
          return values.map((value) => validate(config, value, props))
        }
        return R.assoc(
          fieldName,
          (formValue: any) => runRule(values, props, formValue, validateConfig),
          errors
        )
      }

      if (isObject(validateConfig)) {
        return R.assoc(
          fieldName,
          validate(validateConfig, value, props),
          errors
        )
      }
      return errors
    }, {}),
    R.keys
  )(config)
}

const validator = (config: Config) => (values: FormValues, props: any) => {
  const transformations: any = validate(config, values, props)
  const result = removeUndefinedValues(R.evolve(transformations, values))
  return getValuesFromConfigOnly(config, result)
}

const getValuesFromConfigOnly = (config: Config, result: Object): Object => {
  return Object.keys(config).reduce((acc, key) => {
    const value = result[key]
    if (isArray(value)) {
      return R.assoc(
        key,
        value.map((item, index) =>
          getValuesFromConfigOnly(item, R.prop(index, value))
        ),
        acc
      )
    }

    if (isObject(value)) {
      const subConfig: any = config[key]
      return R.assoc(key, getValuesFromConfigOnly(subConfig, value), acc)
    }

    if (R.has(key, result)) {
      return R.assoc(key, value, acc)
    }

    return acc
  }, {})
}

const removeUndefinedValues = (object: Object): Object => {
  return R.compose(
    R.reduce((accumulated, element: string) => {
      const value = object[element]
      if (value === undefined) {
        return accumulated
      }

      if (isArray(value)) {
        return R.assoc(element, value.map(removeUndefinedValues), accumulated)
      }

      if (isObject(value)) {
        if (R.isEmpty(value)) return accumulated
        const trimmedValue = removeUndefinedValues(value)
        if (R.isEmpty(trimmedValue)) return accumulated
        return R.assoc(element, trimmedValue, accumulated)
      }

      return R.assoc(element, value, accumulated)
    }, {}),
    R.keys
  )(object)
}

export default validator
