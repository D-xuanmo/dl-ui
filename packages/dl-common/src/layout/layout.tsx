import { markRaw, defineComponent, provide, reactive, ref, SetupContext, VNode, watch } from 'vue'
import { addUnit, createNamespace, getComponentName } from '../utils'
import { DGrid } from '../grid'
import { LAYOUT_CONTEXT_KEY } from './context'
import { createRandomID } from '@xuanmo/utils'
import { findChildren } from '../utils/find-children'

const [name, bem] = createNamespace('layout')

export default defineComponent({
  name,
  setup(_, context: SetupContext) {
    const columnsCount = ref(0)
    const rowsTemplate = ref('')
    const columnsMap = reactive<Map<string, string>>(new Map())
    const rows: Map<string, string> = reactive(new Map())
    const children = ref<VNode[]>([])
    const ids: Record<string, string> = {
      layout: createRandomID(8),
      'layout-header': createRandomID(8),
      'layout-footer': createRandomID(8),
      'layout-content': createRandomID(8)
    }
    const collapsedMap = ref<Map<string, boolean>>(new Map())

    const onColumnWidthChange = (layoutId: string, width: string) => {
      columnsMap.set(layoutId, width)
    }

    const onCollapsedChange = (layoutId: string, collapsed: boolean) => {
      collapsedMap.value.set(layoutId, collapsed)
    }

    const getCollapsed = (layoutId: string) => {
      return collapsedMap.value.get(layoutId) ?? false
    }

    provide(LAYOUT_CONTEXT_KEY, {
      columns: columnsCount,
      getCollapsed,
      onColumnWidthChange,
      onCollapsedChange
    })

    watch(
      () => context.slots.default?.(),
      (slotReturn) => {
        rows.clear()
        columnsMap.clear()
        children.value = findChildren(slotReturn!).map((item) => {
          const compName = getComponentName(item.type?.name)
          const layoutId = ids[compName] || createRandomID(8)
          item.props = {
            ...item.props,
            layoutId,
            key: layoutId
          }
          /* eslint-disable indent */
          switch (compName) {
            case 'layout':
              columnsCount.value += 1
              columnsMap.set(layoutId, '1fr')
              break
            case 'layout-sider':
              columnsCount.value++
              columnsMap.set(
                layoutId,
                addUnit(item.props?.width) || addUnit(item.type.props?.width?.default) || '1fr'
              )
              rows.set(
                'layout-content',
                addUnit(item.props?.height) || addUnit(item.type.props?.height?.default) || '1fr'
              )
              break
            case 'layout-content':
              columnsCount.value += 2
              columnsMap.set(layoutId, '1fr 1fr')
              rows.set(
                'layout-content',
                addUnit(item.props?.height) || addUnit(item.type.props?.height?.default) || '1fr'
              )
              break
            case 'layout-header':
            case 'layout-footer':
              rows.set(
                compName,
                addUnit(item.props?.height) || addUnit(item.type.props?.height?.default) || '1fr'
              )
              break
          }
          /* eslint-enable indent */
          return markRaw(item)
        })
        rowsTemplate.value = Array.from(rows.values()).join(' ')
      },
      { immediate: true }
    )

    return () => (
      <DGrid
        class={bem()}
        rows={rowsTemplate.value}
        columns={Array.from(columnsMap.values()).join(' ') || columnsCount.value}
      >
        {children.value}
      </DGrid>
    )
  }
})
