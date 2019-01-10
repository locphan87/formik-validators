# Formik Validators

Reusable field-level form validators for `formik`, support i18n

Table of Contents
=================

* [Getting started](#getting-started)
* [Basic usage](#basic-usage)
* [Custom the translate function](#custom-the-translate-function)
* [Add new validation rules](#add-new-validation-rules)
* [Licensing](#licensing)

## Getting started

```sh
$ yarn add formik-validators
```

## Basic usage

```ts
import validator, { required, minLength, maxLength } from 'formik-validators'

const MyForm = withFormik({
  handleSubmit,
  validate: validator({
    phoneNumber: [
      required('errors.required'),
      minLength(8)('errors.minLength'),
      minLength(10)('errors.minLength')
    ]
  })
})(InnerForm)
```

## Custom the translate function

By default, the translate function would return the same string that you give it

```ts
translateFn = (term, params) => term
```

However, you can create your own translate function.

```ts
// validator.ts
import I18n from 'i18n-js'
import validator, { setTranslateFn } from 'formik-validators'

setTranslateFn((term, params) => I18n.t(term, params))

export default validator
```

```ts
// ../../forms/index.ts
export { default as validator } from './validator'
export * from './forms.components'
```

```ts
// myModule.form.ts
import { validators, TextInput } from '../../forms'
import { required, minLength, getFieldProps } from 'formik-validators'
const InnerForm = props => {
  return (
    <View>
      <TextInput
        {...getFieldProps(props, 'userName')}
        name={'userName'}
        placeholder={'Enter user name'}
      />
    </View>
  )
}
```

```ts
// locales/en.ts
export default {
  'errors.phone.required': 'Phone number is required',
  'errors.phone.minLength': 'Phone number must be at least {{length}} digits',
  'errors.phone.minLength': 'Please enter a maximum of {{length}} digits'
}
```

## Add new validation rules

`formik-validators` comes with some basics validation rules, it's still far to be enough for building a real world app.

Despite that, the library make it easy for adding your custom rules

Example: add a new rule to check the exact length

```ts
const exactLength = (length: number, errorKey: string): RuleFn => ({
  value, values, props
}: RuleInput) => {
  if (isNil(value)) return
  if (value.length !== length) {
    return t(errorKey, { length })
  }
}
```

## Licensing

MIT
