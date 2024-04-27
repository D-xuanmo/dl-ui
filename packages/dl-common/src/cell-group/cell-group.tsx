import { defineComponent, provide, watchEffect, ref, Ref } from 'vue'
import { createNamespace } from '../utils'
import { CELL_GROUP_CONTEXT_KEY } from './context'
import { CELL_GROUP_PROPS } from './props'
import { DirectionType } from '../common'
import { LABEL_WIDTH } from '../constants'
import { useConfig } from '../hooks'

const [name, bem] = createNamespace('cell-group')

export default defineComponent({
  name,
  props: CELL_GROUP_PROPS,
  setup(props, { slots }) {
    const layout = ref(props.layout)

    const config = useConfig(['border', 'round'], props)

    provide(CELL_GROUP_CONTEXT_KEY, {
      cellTitleWidth: props.cellTitleWidth || LABEL_WIDTH,
      cellContentAlign: props.cellContentAlign,
      layout: layout as Ref<DirectionType>,
      border: config.value.border,
      round: config.value.round
    })

    watchEffect(() => {
      layout.value = props.layout
    })

    return () => {
      const { title } = props
      return (
        <div class={bem()}>
          {title && <p class={bem('title')}>{title}</p>}
          <div class={bem('content')}>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
