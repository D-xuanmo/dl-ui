import { computed, inject } from 'vue'
import { FORM_CONTEXT_KEY, IFormContext } from '../context'
import { IFormModelItem } from '../types'

export const useLinkChildren = (children?: string[]) => {
  const { store } = inject(FORM_CONTEXT_KEY) as IFormContext

  return computed(() => {
    return (children?.map((item: string) => store.getItem(item)) ?? []) as IFormModelItem[]
  })
}
