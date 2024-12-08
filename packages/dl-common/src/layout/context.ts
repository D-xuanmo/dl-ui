import { InjectionKey, Ref } from 'vue'

type LayoutContext = {
  columns: Ref<number>
  getCollapsed: (layoutId: string) => boolean
  onColumnWidthChange: (layoutId: string, width: string) => void
  onCollapsedChange: (layoutId: string, collapsed: boolean) => void
}

export const LAYOUT_CONTEXT_KEY: InjectionKey<LayoutContext> = Symbol('Layout')
