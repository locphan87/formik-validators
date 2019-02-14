import { getIn } from 'formik'
import * as R from 'ramda'
import { isNonEmptyString, isArray, isObject } from 'ramda-adjunct'

import { Config, RuleFn, FormValues } from '../typings'
import {
  removeUndefinedValuesAndEmptyObjects,
  getValuesBasedOnObjectKeys
} from './utils'

const runRule = (
  values: FormValues,
  formValue: string,
  validateConfig: RuleFn[],
  props: any
) => {
  let errorMessage = undefined
  validateConfig.find(
    (rule: RuleFn): boolean => {
      errorMessage = rule({
        values,
        props,
        value: formValue
      })

      return isNonEmptyString(errorMessage)
    }
  )

  return errorMessage
}

const validate = (config: Config, values: FormValues, props: any): Object => {
  return R.compose(
    R.reduce((errors, fieldName: string) => {
      const validateConfig: Config = getIn(config, fieldName)
      const value = getIn(values, fieldName)
      if (isArray(values)) {
        return values.map((value) => validate(config, value, props))
      }
      if (isArray(validateConfig)) {
        return R.assoc(
          fieldName,
          (formValue: string) =>
            runRule(values, formValue, validateConfig, props),
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
  const filteredValues: any = getValuesBasedOnObjectKeys(config, values)
  const transformations: any = validate(config, filteredValues, props)
  return removeUndefinedValuesAndEmptyObjects(
    R.evolve(transformations, filteredValues)
  )
}

export default validator
