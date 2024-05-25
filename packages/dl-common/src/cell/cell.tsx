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
  emits: ['click'],
  setup(props, { slots, emit }) {
    provide(CELL_GROUP_CONTEXT_KEY, {
      layout: ref<DirectionType>('horizontal')
    })
    const globalConfig = useGlobalConfig(props)

    const wrapperClassName = computed(() =>
      bem({
        'hide-title': globalConfig.value.hideTitle,
        [`layout-${globalConfig.value.layout}`]: globalConfig.value.layout,
        disabled: props.disabled,
        border: globalConfig.value.border || globalConfig.value.border === undefined,
        [`${globalConfig.value.clientType?.toLowerCase()}`]: true,
        round: globalConfig.value.round
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
          [globalConfig.value.contentAlign]: globalConfig.value.contentAlign
        }),
        props.contentClass
      ]

      const leftIcon = slots['left-icon'] ? (
        <span class={bem('title-icon')}>{slots['left-icon']!()}</span>
      ) : null
      const leftMark =
        props.required && globalConfig.value.requiredMarkPosition === 'left' ? (
          <span class={bem('title-mark')}>* </span>
        ) : null
      const rightMark =
        props.required && globalConfig.value.requiredMarkPosition === 'right' ? (
          <span class={bem('title-mark')}> *</span>
        ) : null
      const defaultLabel = (
        <>
          {leftIcon}
          {leftMark}
          <span>{props.title}</span>
          {rightMark}
        </>
      )
      const renderLabel =
        !globalConfig.value.hideTitle && !(isEmpty(props.title) && isEmpty(slots.title)) ? (
          <div class={titleClassName} style={{ width: addUnit(globalConfig.value.labelWidth) }}>
            {!isEmpty(slots.title) ? slots.title?.() : defaultLabel}
          </div>
        ) : null

      const renderDescription = props.description ? (
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

      function handleClick(event: Event) {
        emit('click', event)
      }

      if (globalConfig.value.clientType === 'MOBILE') {
        return (
          <div class={wrapperClassName.value}>
            <div class={bem('wrapper')} onClick={handleClick}>
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
        <div class={wrapperClassName.value} onClick={handleClick}>
          {renderLabel}
          <div class={contentClassName}>
            <div class={bem('content-inner')}>
              {slots.default ? slots.default() : props.content}
            </div>
            {renderRightIcon}
            {renderSuffix}
            {renderDescription}
          </div>
        </div>
      )
    }
  }
})
