import validator from './validator'

type TranslateFn = (term: string, params?: object) => string

const utils = {
  t: (term: string, params?: object) => term
}
const setTranslateFn = (fn: TranslateFn) => {
  utils.t = fn
}
const t = utils.t

export { t, setTranslateFn }
export * from './rules'
export default validator
