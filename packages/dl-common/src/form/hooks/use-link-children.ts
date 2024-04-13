import { computed, inject } from 'vue'
import { FORM_CONTEXT_KEY, IFormContext } from '../context'

export const useLinkChildren = (id: string) => {
  const { store } = inject(FORM_CONTEXT_KEY) as IFormContext

  return computed(() => store.getChildren(id))
}
