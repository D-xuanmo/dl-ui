import { computed, defineComponent, provide, ref } from 'vue'
import { createNamespace, addUnit } from '@xuanmo/dl-common'
import { isEmpty, toBoolean } from '@xuanmo/javascript-utils'
import DIcon from '../icon'
import { CELL_PROPS } from './props'
import { useGlobalConfig } from './utils'
import { CELL_GROUP_CONTEXT_KEY } from '../context'
import { DirectionType } from '../common'

const [name, bem] = createNamespace('cell')

export default defineComponent({
  name,
  props: CELL_PROPS,
  emits: ['click'],
  setup(props, { slots, emit }) {
    provide(CELL_GROUP_CONTEXT_KEY, {
      layout: ref<DirectionType>('horizontal')
    })

    return () => {
      const { labelWidth, contentAlign, hideTitle, layout, border } = useGlobalConfig(props)
      const {
        title,
        titleAlign,
        required,
        content,
        titleClass,
        contentClass,
        disabled,
        suffix,
        leftIcon,
        leftIconSize,
        leftIconColor,
        leftIconProps,
        rightIcon,
        rightIconColor,
        rightIconSize,
        rightIconProps,
        arrow,
        description
      } = props

      const wrapperClassName = computed(() =>
        bem({
          'hide-title': hideTitle,
          [`layout-${layout}`]: layout,
          disabled,
          border: border || border === undefined
        })
      )

      const titleClassName = bem('title', {
        [titleClass ?? '']: toBoolean(titleClass),
        [titleAlign]: titleAlign
      })

      const contentClassName = bem('content', {
        [contentClass ?? '']: toBoolean(contentClass),
        [contentAlign]: contentAlign
      })

      const renderLabel =
        hideTitle || (isEmpty(title) && isEmpty(slots.title)) ? null : (
          <div
            className={titleClassName}
            style={{
              width: addUnit(labelWidth)
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

      const renderDescription = description ? (
        <div class={bem('description')}>{description}</div>
      ) : null

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
        <div class={wrapperClassName.value}>
          <div class={bem('layout')} onClick={handleClick}>
            <div class={bem('wrapper')}>
              {renderLabel}
              <div class={contentClassName}>
                <div class={bem('content-inner')}>{slots.default ? slots.default() : content}</div>
                {renderRightIcon}
                {renderSuffix}
              </div>
            </div>

            {renderArrow}
          </div>
          {renderDescription}
        </div>
      )
    }
  }
})
