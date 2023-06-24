import { computed, defineComponent, provide, ref } from 'vue'
import { createNamespace, addUnit } from '@xuanmo/dl-common'
import { isEmpty, toBoolean } from '@xuanmo/utils'
import { CELL_PROPS } from './props'
import { useGlobalConfig } from './utils'
import { CELL_GROUP_CONTEXT_KEY } from '../context'
import { DirectionType } from '@xuanmo/dl-common'
import { RightOutlined } from '@xuanmo/dl-icons'

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
            class={titleClassName}
            style={{
              width: addUnit(labelWidth)
            }}
          >
            {slots.title ? (
              slots.title()
            ) : (
              <>
                {slots['left-icon'] ? (
                  <span class={bem('title-icon')}>{slots['left-icon']()}</span>
                ) : null}
                <span>{title}</span>
                {required ? <span class={bem('title-mark')}> *</span> : null}
              </>
            )}
          </div>
        )

      const renderDescription = description ? (
        <div class={bem('description')}>{description}</div>
      ) : null

      const renderRightIcon = slots['right-icon'] && (
        <span class={bem('right-icon')}>{slots['right-icon']()}</span>
      )

      const renderSuffix =
        slots.suffix || suffix ? (
          <div class={bem('suffix')}>{slots.suffix ? slots.suffix() : suffix}</div>
        ) : null

      const renderArrow = arrow ? (
        <RightOutlined className={bem('arrow')} color="var(--d-secondary-text-color)" />
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
