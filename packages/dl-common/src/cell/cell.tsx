import { computed, defineComponent, provide, ref } from 'vue'
import { createNamespace, addUnit } from '../utils'
import { isEmpty, toBoolean } from '@xuanmo/utils'
import { CELL_PROPS } from './props'
import { useGlobalConfig } from './utils'
import { CELL_GROUP_CONTEXT_KEY } from '../cell-group/context'
import { DirectionType } from '../common'
import { RightOutlined } from '@xuanmo/dl-icons'
import { If, Then, Else, When } from 'vue-if'

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
        border: globalConfig.value.border || globalConfig.value.border === undefined
      })
    )

    return () => {
      const titleClassName = bem('title', {
        [props.titleClass ?? '']: toBoolean(props.titleClass),
        [props.titleAlign]: props.titleAlign
      })

      const contentClassName = bem('content', {
        [props.contentClass ?? '']: toBoolean(props.contentClass),
        [globalConfig.value.contentAlign]: globalConfig.value.contentAlign
      })

      const renderLabel = (
        <When
          condition={
            !globalConfig.value.hideTitle || !(isEmpty(props.title) && isEmpty(slots.title))
          }
        >
          <div class={titleClassName} style={{ width: addUnit(globalConfig.value.labelWidth) }}>
            <If condition={!isEmpty(slots.title)}>
              <Then>{slots.title?.()}</Then>
              <Else>
                <When condition={!isEmpty(slots['left-icon'])}>
                  <span class={bem('title-icon')}>{slots['left-icon']!()}</span>
                </When>
                <When
                  condition={props.required && globalConfig.value.requiredMarkPosition === 'left'}
                >
                  <span class={bem('title-mark')}>* </span>
                </When>
                <span>{props.title}</span>
                <When
                  condition={props.required && globalConfig.value.requiredMarkPosition === 'right'}
                >
                  <span class={bem('title-mark')}> *</span>
                </When>
              </Else>
            </If>
          </div>
        </When>
      )

      const renderDescription = (
        <When condition={props.description}>
          <div class={bem('description')}>{props.description}</div>
        </When>
      )

      const renderRightIcon = (
        <When condition={slots['right-icon'] as any}>
          <span class={bem('right-icon')}>{slots['right-icon']!()}</span>
        </When>
      )

      const renderSuffix = (
        <When condition={(slots.suffix || props.suffix) as any}>
          <div class={bem('suffix')}>{slots.suffix ? slots.suffix() : props.suffix}</div>
        </When>
      )

      const renderArrow = (
        <When condition={props.arrow}>
          <RightOutlined className={bem('arrow')} color="var(--d-secondary-text-color)" />
        </When>
      )

      function handleClick(event: Event) {
        emit('click', event)
      }

      return (
        <div class={wrapperClassName.value}>
          <div class={bem('layout')} onClick={handleClick}>
            <div class={bem('wrapper')}>
              {renderLabel}
              <div class={contentClassName}>
                <div class={bem('content-inner')}>
                  <If condition={!isEmpty(slots.default)}>
                    <Then>{slots.default?.()}</Then>
                    <Else>{props.content}</Else>
                  </If>
                </div>
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
