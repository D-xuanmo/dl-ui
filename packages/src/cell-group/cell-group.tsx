import { defineComponent, provide, inject } from 'vue'
import { createNamespace } from '../utils'
import { CELL_GROUP_CONTEXT_KEY, GLOBAL_CONFIG_CONTEXT_KEY } from '../context'
import { LABEL_WIDTH } from '../constants'
import { CELL_GROUP_PROPS } from './props'

const [name, bem] = createNamespace('cell-group')

export default defineComponent({
  name,
  props: CELL_GROUP_PROPS,
  setup(props, { slots }) {
    const globalConfig = inject(GLOBAL_CONFIG_CONTEXT_KEY)
    provide(CELL_GROUP_CONTEXT_KEY, {
      cellTitleWidth: props.cellTitleWidth || globalConfig?.labelWidth || LABEL_WIDTH,
      cellContentAlign: props.cellContentAlign || globalConfig?.contentAlign
    })
    return () => {
      const { title, round } = props
      return (
        <div className={bem()}>
          {title && <p className={bem('title')}>{title}</p>}
          <div className={bem('content', { round })}>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
