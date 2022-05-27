import { defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '@/utils/bem'
import { globalConfigKey } from '@/constants/context'
import { toBoolean } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('cell')

const props = {
  title: String as PropType<string>,
  required: Boolean as PropType<boolean>,
  content: String as PropType<string>,
  hideTitle: Boolean as PropType<boolean>,
  titleClass: String as PropType<string>,
  contentClass: String as PropType<string>
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { labelWidth, hideLabel } = inject(globalConfigKey) ?? {}
      const { title, required, content, hideTitle, titleClass, contentClass } = props

      const titleClassName = bem('title', {
        [titleClass ?? '']: toBoolean(titleClass)
      })

      const contentClassName = bem('content', {
        [contentClass ?? '']: toBoolean(contentClass)
      })

      const label = hideLabel ? null : (
        <div className={titleClassName} style={{ width: labelWidth }}>
          {title}
          {required ? <span className={bem('title', 'mark', true)}> *</span> : null}
        </div>
      )

      return (
        <div className={bem({ 'hide-title': hideTitle })}>
          {hideTitle ? null : label}
          <div className={contentClassName}>{slots.default ? slots.default() : content}</div>
        </div>
      )
    }
  }
})
