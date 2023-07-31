import { computed, defineComponent, provide, reactive, ref, SetupContext, watchEffect } from 'vue'
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

    const children = computed(() => {
      return context.slots.default?.()?.map((item) => {
        const layoutId = createRandomID(6)
        item.props = {
          ...item.props,
          layoutId
        }
        return item
      })
    })

    const onColumnWidthChange = (layoutId: string, width: string) => {
      columnsMap.set(layoutId, width)
    }

    watchEffect(() => {
      const _children = children.value
      const rows: Map<string, string> = new Map()
      let currentColumns = 0
      if (_children) {
        for (let i = 0; i < _children.length; i++) {
          const item: any = _children[i]
          const compName = getComponentName(item.type?.name)
          /* eslint-disable indent */
          switch (compName) {
            case 'layout':
              currentColumns += 1
              columnsMap.set(item.props.layoutId, '1fr')
              break
            case 'layout-sider':
              currentColumns++
              columnsMap.set(
                item.props.layoutId,
                addUnit(item.props?.width) || addUnit(item.type.props?.width?.default) || '1fr'
              )
              rows.set(
                'layout-content',
                addUnit(item.props?.height) || addUnit(item.type.props?.height?.default) || '1fr'
              )
              break
            case 'layout-content':
              currentColumns += 2
              columnsMap.set(item.props.layoutId, '1fr 1fr')
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
        }
      }
      columnsCount.value = currentColumns
      rowsTemplate.value = Array.from(rows.values()).join(' ')
    })

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
        {children.value}
      </DGrid>
    )
  }
})
