import { defineComponent, inject } from 'vue'
import { createNamespace } from '../utils'
import { isEmpty, toBoolean } from '@xuanmo/javascript-utils'
import DIcon from '../icon'
import { CELL_GROUP_CONTEXT_KEY, GLOBAL_CONFIG_CONTEXT_KEY } from '../context'
import { CELL_PROPS } from './props'

const [name, bem] = createNamespace('cell')

export default defineComponent({
  name,
  props: CELL_PROPS,
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () => {
      const { labelWidth, hideLabel } = inject(GLOBAL_CONFIG_CONTEXT_KEY) ?? {}
      const cellGroupConfig = inject(CELL_GROUP_CONTEXT_KEY)
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
        rightIconProps,
        arrow
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
            style={{
              width: titleWidth || cellGroupConfig?.cellTitleWidth || labelWidth
            }}
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
        slots.suffix || suffix ? (
          <div className={bem('suffix')}>{slots.suffix ? slots.suffix() : suffix}</div>
        ) : null

      const renderArrow = arrow ? (
        <DIcon name="arrow-right" className={bem('arrow')} color="var(--d-secondary-text-color)" />
      ) : null

      function handleClick(event: Event) {
        emit('click', event)
      }

      return (
        <div
          class={bem({
            'hide-title': hideTitle,
            disabled
          })}
          onClick={handleClick}
        >
          {renderLabel}
          <div class={contentClassName}>{slots.default ? slots.default() : content}</div>
          {renderRightIcon}
          {renderSuffix}
          {renderArrow}
        </div>
      )
    }
  }
})
