import { InjectionKey, Ref } from 'vue'

type LayoutContext = {
  columns: Ref<number>
  onColumnWidthChange: (layoutId: string, width: string) => void
}

export const LAYOUT_CONTEXT_KEY = Symbol('layout') as InjectionKey<LayoutContext>
