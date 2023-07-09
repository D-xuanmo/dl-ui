import { ComputedRef, InjectionKey } from 'vue'
import { type FormStore } from './store'
import { FormProps } from './props'
import { OnFormChange } from './types'

export interface IFormContext {
  store: FormStore
  formProps: ComputedRef<
    Pick<
      FormProps,
      | 'colon'
      | 'disabled'
      | 'readonly'
      | 'layout'
      | 'labelWidth'
      | 'hideLabel'
      | 'requiredMarkPosition'
    >
  >
  onChange: OnFormChange
}

export const FORM_CONTEXT_KEY = Symbol('form') as InjectionKey<IFormContext>
