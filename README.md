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

- Install with `npm`

```sh
$ npm install formik-validators
```

- Install with `yarn`

```sh
$ yarn add formik-validators
```

## Basic usage

```ts
// myModule.form.ts
import validator, { required, minLength, maxLength } from 'formik-validators'

const InnerForm = props => {
  return (
    <View>
      <TextInput
        {...getFieldProps(props, 'phoneNumber')}
        name={'phoneNumber'}
        placeholder={'Enter your phone number'}
      />
    </View>
  )
}
const MyForm = withFormik({
  validate: validator({
    phoneNumber: [
      required('errors.phone.required'),
      minLength(8)('errors.phone.minLength'),
      maxLength(10)('errors.phone.maxLength')
    ]
  })
})(InnerForm)
```

## Custom the translate function

By default, the translate function would return the same string that you give it

```ts
translateFn = (term, params) => term
```

But you can create your own translate function.

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
export * from './forms.components' // i.e TextInput, Checkbox, TextArea,...
```

```ts
// myModule.form.ts
import { validator, TextInput } from '../../forms'
import { required, minLength, getFieldProps } from 'formik-validators'
...
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

`formik-validators` comes with some basics validation rules, but it's not enough for building a real world app.

Despite that, it is easy for adding your custom rules.

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
