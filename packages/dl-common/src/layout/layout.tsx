import { defineComponent, provide, reactive, ref, SetupContext } from 'vue'
import { addUnit, createNamespace, getComponentName } from '../utils'
import DGrid from '../grid'
import { LAYOUT_CONTEXT_KEY } from './context'
import { createRandomID } from '@xuanmo/utils'

const [name, bem] = createNamespace('layout')

export default defineComponent({
  name,
  setup(_, context: SetupContext) {
    const columnsCount = ref(0)
    const rowsTemplate = ref('')
    const columnsMap = reactive<Map<string, string>>(new Map())
    const rows: Map<string, string> = new Map()
    const children = context.slots.default?.()?.map((item: any) => {
      const layoutId = createRandomID(8)
      item.props = {
        ...item.props,
        layoutId
      }
      const compName = getComponentName(item.type?.name)
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
      return item
    })

    const onColumnWidthChange = (layoutId: string, width: string) => {
      columnsMap.set(layoutId, width)
    }

    rowsTemplate.value = Array.from(rows.values()).join(' ')

    provide(LAYOUT_CONTEXT_KEY, {
      columns: columnsCount,
      onColumnWidthChange
    })

    return () => (
      <DGrid
        class={bem()}
        rows={rowsTemplate.value}
        columns={Array.from(columnsMap.values()).join(' ') || columnsCount.value}
      >
        {children}
      </DGrid>
    )
  }
})
