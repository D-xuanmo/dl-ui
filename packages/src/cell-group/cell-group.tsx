import { defineComponent } from 'vue'
import { createNamespace } from '../utils/bem'

const [name, bem] = createNamespace('cell-group')

const props = {
  title: String,
  round: Boolean
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { title, round } = props
      return (
        <div className={bem()}>
          <p className={bem('title')}>{title}</p>
          <div className={bem('content', { round })}>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
