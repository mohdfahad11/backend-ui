import { configure, extend, ValidationObserver, ValidationProvider } from 'vee-validate'


import {
    required,
    alpha_spaces,
    numeric,
    min_value,
    min,
    max,
    regex,
    length,
    email
} from 'vee-validate/dist/rules'
export default async ({ Vue }) => {
// Register it globally
    Vue.component('ValidationProvider', ValidationProvider)
    Vue.component('ValidationObserver', ValidationObserver)
    configure(config)
  }

const config = {
    classes: true,
    classNames: {
    invalid: 'is-invalid'
    }
}
extend('required', {
    ...required,
    message: 'This field is required'
})
extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'This field only contains alphabetic characters'
})
extend('min', {
    ...min,
    message: 'Enter Enough characters'
})
extend('max', {
    ...max,
    message: 'The field must be 10 characters max'
})
extend('min_value', min_value)
extend('numeric', numeric)
extend('regex', regex)
extend('length', length)
extend('email', email)
// extend('decimal', decimal)
