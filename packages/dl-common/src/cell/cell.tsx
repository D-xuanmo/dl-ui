import { computed, defineComponent, provide, ref } from 'vue'
import { createNamespace, addUnit } from '../utils'
import { isEmpty } from '@xuanmo/utils'
import { CELL_PROPS } from './props'
import { useGlobalConfig } from './utils'
import { CELL_GROUP_CONTEXT_KEY } from '../cell-group/context'
import { DirectionType } from '../common'
import { RightOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('cell')

export default defineComponent({
  name,
  props: CELL_PROPS,
  setup(props, { slots }) {
    provide(CELL_GROUP_CONTEXT_KEY, {
      layout: ref<DirectionType>('horizontal')
    })
    const config = useGlobalConfig(props)

    const wrapperClassName = computed(() =>
      bem({
        'hide-title': config.value.hideTitle,
        [`layout-${config.value.layout}`]: config.value.layout,
        disabled: props.disabled,
        border: config.value.border || config.value.border === undefined,
        [`${config.value.clientType?.toLowerCase()}`]: true,
        round: config.value.round
      })
    )

    return () => {
      const titleClassName = [
        bem('title', {
          [props.titleAlign]: props.titleAlign,
          'title-vertical-center': props.titleVerticalCenter
        }),
        props.titleClass
      ]

      const contentClassName = [
        bem('content', {
          [config.value.contentAlign]: config.value.contentAlign
        }),
        props.contentClass
      ]

      const leftIcon = slots['left-icon'] ? (
        <span class={bem('title-icon')}>{slots['left-icon']!()}</span>
      ) : null
      const leftMark =
        props.required && config.value.requiredMarkPosition === 'left' ? (
          <span class={bem('title-mark')}>*</span>
        ) : null
      const rightMark =
        props.required && config.value.requiredMarkPosition === 'right' ? (
          <span class={bem('title-mark')}>*</span>
        ) : null
      const titleNode = config.value.renderCellTitle?.(props.title!, props.description) || (
        <span>{props.title}</span>
      )
      const defaultLabel = (
        <>
          {leftIcon}
          {leftMark}
          {titleNode}
          {rightMark}
        </>
      )
      const renderLabel =
        !config.value.hideTitle && !(isEmpty(props.title) && isEmpty(slots.title)) ? (
          <div class={titleClassName} style={{ width: addUnit(config.value.labelWidth) }}>
            {!isEmpty(slots.title) ? slots.title?.() : defaultLabel}
          </div>
        ) : null

      const renderDescription = config.value.useCustomDescription ? null : props.description ? (
        <div class={bem('description')}>{props.description}</div>
      ) : null

      const renderRightIcon = slots['right-icon'] ? (
        <span class={bem('right-icon')}>{slots['right-icon']!()}</span>
      ) : null

      const renderSuffix =
        slots.suffix || props.suffix ? (
          <div class={bem('suffix')}>{slots.suffix ? slots.suffix() : props.suffix}</div>
        ) : null

      const renderArrow = props.arrow ? (
        <RightOutlined className={bem('arrow')} color="var(--d-secondary-text-color)" />
      ) : null

      if (config.value.clientType === 'MOBILE') {
        return (
          <div class={wrapperClassName.value}>
            <div class={bem('wrapper')}>
              {renderLabel}
              <div class={contentClassName}>
                <div class={bem('content-inner')}>
                  {slots.default ? slots.default() : props.content}
                </div>
                {renderRightIcon}
                {renderSuffix}
                {renderArrow}
              </div>
            </div>
            {renderDescription}
          </div>
        )
      }

      return (
        <div class={wrapperClassName.value}>
          {renderLabel}
          <div class={contentClassName}>
            {renderDescription}
            <div class={bem('content-inner')}>
              {slots.default ? slots.default() : props.content}
            </div>
            {renderRightIcon}
            {renderSuffix}
          </div>
        </div>
      )
    }
  }
})
