import { inject } from 'vue'
import { FORM_CONTEXT_KEY, IFormContext } from '../context'

export const useForm = () => inject(FORM_CONTEXT_KEY) as IFormContext
