import { defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '../utils/bem'
import { globalConfigKey } from '../constants/context'
import { isEmpty, toBoolean } from '@xuanmo/javascript-utils'
import { HorizontalAlignEnum, SizeEnum } from '../common'
import DIcon from '../icon'

const [name, bem] = createNamespace('cell')

const props = {
  title: String,
  titleClass: String,
  titleWidth: String,
  titleAlign: {
    type: String as PropType<HorizontalAlignEnum>,
    default: 'left'
  },
  hideTitle: Boolean,
  required: Boolean,
  leftIcon: String,
  leftIconSize: String as PropType<SizeEnum | string>,
  leftIconColor: String,
  leftIconProps: Object,

  content: String,
  contentClass: String,
  contentAlign: {
    type: String as PropType<HorizontalAlignEnum>,
    default: 'right'
  },
  disabled: Boolean,

  suffix: String,
  rightIcon: String,
  rightIconSize: String as PropType<SizeEnum | string>,
  rightIconColor: String,
  rightIconProps: Object
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () => {
      const { labelWidth, hideLabel } = inject(globalConfigKey) ?? {}
      const {
        title,
        titleAlign,
        titleWidth,
        required,
        content,
        hideTitle = hideLabel,
        titleClass,
        contentClass,
        disabled,
        suffix,
        contentAlign,
        leftIcon,
        leftIconSize,
        leftIconColor,
        leftIconProps,
        rightIcon,
        rightIconColor,
        rightIconSize,
        rightIconProps
      } = props

      const titleClassName = bem('title', {
        [titleClass ?? '']: toBoolean(titleClass),
        [titleAlign]: titleAlign
      })

      const contentClassName = bem('content', {
        [contentClass ?? '']: toBoolean(contentClass),
        [contentAlign]: contentAlign
      })

      const renderLabel =
        hideTitle || isEmpty(title) ? null : (
          <div
            className={titleClassName}
            style={{ width: titleWidth || labelWidth }}
          >
            {slots.title ? (
              slots.title()
            ) : (
              <>
                {leftIcon ? (
                  <DIcon
                    name={leftIcon}
                    className={bem('title', 'icon', true)}
                    size={leftIconSize}
                    color={leftIconColor}
                    {...leftIconProps}
                  />
                ) : null}
                <span>{title}</span>
                {required ? <span className={bem('title', 'mark', true)}> *</span> : null}
              </>
            )}
          </div>
        )

      const renderRightIcon = rightIcon && (
        <DIcon
          name={rightIcon}
          color={rightIconColor}
          size={rightIconSize}
          className={bem('right-icon')}
          {...rightIconProps}
        />
      )

      const renderSuffix =
        slots.suffix || suffix ? <div className={bem('suffix')}>{slots.suffix ? slots.suffix() : suffix}</div> : null

      return (
        <div className={bem({ 'hide-title': hideTitle, disabled })}>
          {renderLabel}
          <div className={contentClassName}>{slots.default ? slots.default() : content}</div>
          {renderRightIcon}
          {renderSuffix}
        </div>
      )
    }
  }
})
