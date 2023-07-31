import { defineComponent, inject, SetupContext } from 'vue'
import { createNamespace } from '../utils'
import { DGridItem } from '../grid'
import { LAYOUT_CONTEXT_KEY } from './context'
import { LAYOUT_FOOTER_PROPS } from './props'

const [name, bem] = createNamespace('layout-footer')

export default defineComponent({
  name,
  props: LAYOUT_FOOTER_PROPS,
  setup(props, context: SetupContext) {
    const { columns } = inject(LAYOUT_CONTEXT_KEY)!
    return () => (
      <DGridItem class={bem({ border: props.border })} column={columns.value}>
        {context.slots.default?.()}
      </DGridItem>
    )
  }
})
