import { defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '@/utils/bem'
import { globalConfigKey } from '@/constants/context'

const [name, bem] = createNamespace('cell')

const props = {
  title: String as PropType<string>,
  required: Boolean as PropType<boolean>,
  content: String as PropType<string>,
  hideTitle: Boolean as PropType<boolean>
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { labelWidth, hideLabel } = inject(globalConfigKey) ?? {}
      const { title, required, content, hideTitle } = props

      const requiredMark = required ? <span className={bem('title', 'mark')}> *</span> : null

      const label = hideLabel ? null : (
        <div className={bem('title')} style={{ width: labelWidth }}>
          {title}
          {requiredMark}
        </div>
      )

      return (
        <div className={bem({ 'hide-title': hideTitle })}>
          {hideTitle ? null : label}
          <div className={bem('content')}>{slots.default ? slots.default() : content}</div>
        </div>
      )
    }
  }
})
