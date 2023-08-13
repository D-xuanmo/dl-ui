import { inject, defineComponent, ref, SetupContext } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { DGridItem } from '../grid'
import { LAYOUT_SIDER_PROPS } from './props'
import { LeftOutlined } from '@xuanmo/dl-icons'
import { LAYOUT_CONTEXT_KEY } from './context'
import { When } from 'vue-if'

const [name, bem] = createNamespace('layout-sider')

export default defineComponent({
  name,
  props: LAYOUT_SIDER_PROPS,
  emits: ['collapsed'],
  setup(props, context: SetupContext) {
    const { onColumnWidthChange } = inject(LAYOUT_CONTEXT_KEY)!
    const collapsed = ref(false)

    const handleCollapsed = () => {
      collapsed.value = !collapsed.value
      onColumnWidthChange(
        context.attrs!.layoutId as string,
        collapsed.value ? addUnit(props.collapsedWidth) : addUnit(props.width)
      )
      context.emit('collapsed', collapsed.value)
    }

    return () => (
      <DGridItem
        class={bem({
          border: props.border,
          collapsed: collapsed.value,
          [`placement-${props.placement}`]: true
        })}
        column={1}
      >
        <When condition={props.collapsed}>
          <span class={bem('trigger')} style={{ top: addUnit(props.triggerTop) }}>
            <LeftOutlined onClick={handleCollapsed} />
          </span>
        </When>
        <div class={bem('content')}>{context.slots.default?.()}</div>
      </DGridItem>
    )
  }
})
