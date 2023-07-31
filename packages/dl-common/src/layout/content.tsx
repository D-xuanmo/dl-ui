import { defineComponent, SetupContext } from 'vue'
import { createNamespace } from '../utils'
import { DGridItem } from '../grid'

const [name, bem] = createNamespace('layout-content')

export default defineComponent({
  name,
  setup(_, context: SetupContext) {
    return () => (
      <DGridItem class={bem()} column={2}>
        {context.slots.default?.()}
      </DGridItem>
    )
  }
})
