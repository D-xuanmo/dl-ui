import { defineComponent, provide, PropType, inject } from 'vue'
import { createNamespace } from '../utils/bem'
import { CELL_GROUP_KEY, GLOBAL_CONFIG_KEY } from '../context'
import { LABEL_WIDTH } from '../constants'

const [name, bem] = createNamespace('cell-group')

const props = {
  title: String as PropType<string | undefined>,
  round: {
    type: Boolean,
    default: true
  },
  cellTitleWidth: String
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const globalConfig = inject(GLOBAL_CONFIG_KEY)
    provide(CELL_GROUP_KEY, {
      cellTitleWidth: props.cellTitleWidth || globalConfig?.labelWidth || LABEL_WIDTH
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
