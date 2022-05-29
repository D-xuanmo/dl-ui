import { defineComponent, inject } from 'vue'
import { createNamespace } from '@/utils/bem'
import { globalConfigKey } from '@/constants/context'
import { toBoolean } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('cell')

const props = {
  title: String,
  required: Boolean,
  content: String,
  hideTitle: Boolean,
  titleClass: String,
  contentClass: String,
  disabled: Boolean,
  suffix: String
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { labelWidth, hideLabel } = inject(globalConfigKey) ?? {}
      const { title, required, content, hideTitle = hideLabel, titleClass, contentClass, disabled, suffix } = props

      const titleClassName = bem('title', {
        [titleClass ?? '']: toBoolean(titleClass)
      })

      const contentClassName = bem('content', {
        [contentClass ?? '']: toBoolean(contentClass)
      })

      const label = hideTitle ? null : (
        <div
          className={titleClassName}
          style={{ width: labelWidth }}
        >
          {slots.title ? (
            slots.title()
          ) : (
            <>
              {title}
              {required ? <span className={bem('title', 'mark', true)}> *</span> : null}
            </>
          )}
        </div>
      )

      const suffixRender =
        slots.suffix || suffix ? <div className={bem('suffix')}>{slots.suffix ? slots.suffix() : suffix}</div> : null

      return (
        <div className={bem({ 'hide-title': hideTitle, disabled })}>
          {label}
          <div className={contentClassName}>{slots.default ? slots.default() : content}</div>
          {suffixRender}
        </div>
      )
    }
  }
})
