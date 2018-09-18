import validator from './validator'

type TranslateFn = (term: string, params?: object) => string

let t = (term: string, params?: object) => term
const setTranslateFn = (fn: TranslateFn) => {
  t = fn
}

export { t, setTranslateFn }
export * from './rules'
export * from './utils'
export default validator
