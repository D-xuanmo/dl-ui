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
      | 'border'
      | 'layout'
      | 'hideLabel'
      | 'labelWidth'
      | 'clientType'
      | 'requiredMarkPosition'
    >
  >
  onChange: OnFormChange
}

export const FORM_CONTEXT_KEY: InjectionKey<IFormContext> = Symbol('Form')
