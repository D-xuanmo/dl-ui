import { defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '@/utils/bem'
import { globalConfigKey } from '@/constants/context'
import { isEmpty, toBoolean } from '@xuanmo/javascript-utils'
import { HorizontalAlignEnum } from '@/common'
import DIcon from '../icon'

const [name, bem] = createNamespace('cell')

const props = {
  title: String,
  required: Boolean,
  content: String,
  hideTitle: Boolean,
  titleClass: String,
  contentClass: String,
  disabled: Boolean,
  suffix: String,
  align: {
    type: String as PropType<HorizontalAlignEnum>,
    default: 'right'
  },
  icon: String,
  iconProps: Object
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { labelWidth, hideLabel } = inject(globalConfigKey) ?? {}
      const {
        title,
        required,
        content,
        hideTitle = hideLabel,
        titleClass,
        contentClass,
        disabled,
        suffix,
        align = 'right',
        icon,
        iconProps = {}
      } = props

      const titleClassName = bem('title', {
        [titleClass ?? '']: toBoolean(titleClass)
      })

      const contentClassName = bem('content', {
        [contentClass ?? '']: toBoolean(contentClass),
        [align]: align
      })

      const label =
        hideTitle || isEmpty(title) ? null : (
          <div
            className={titleClassName}
            style={{ width: labelWidth }}
          >
            {slots.title ? (
              slots.title()
            ) : (
              <>
                {icon ? (
                  <DIcon
                    name={icon}
                    className={bem('title', 'icon', true)}
                    {...iconProps}
                  />
                ) : null}
                <span>{title}</span>
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
