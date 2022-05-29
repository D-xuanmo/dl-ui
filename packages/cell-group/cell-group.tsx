import { defineComponent } from 'vue'
import { createNamespace } from '@/utils/bem'

const [name, bem] = createNamespace('cell-group')

const props = {
  title: String,
  radius: Boolean
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { title, radius } = props
      return (
        <div className={bem()}>
          <p className={bem('title')}>{title}</p>
          <div className={bem('content', { radius })}>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
