import validator from './validator'
import { TranslateFn } from '../typings'

export * from '../typings'
export * from './validator'
export * from './rules'
export * from './utils'

let t = (term: string, params?: object) => term
const setTranslateFn = (fn: TranslateFn) => {
  t = fn
}

export { t, setTranslateFn }
export default validator
