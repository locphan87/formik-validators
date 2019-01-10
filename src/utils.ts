import { getIn } from 'formik'

const getFieldProps = (props: any, name: string) => ({
  value: getIn(props.values, name),
  touched: getIn(props.touched, name),
  error: getIn(props.errors, name) || '',
  setFieldValue: props.setFieldValue,
  handleBlur: props.handleBlur,
  handleChange: props.handleChange
})

export { getFieldProps }
