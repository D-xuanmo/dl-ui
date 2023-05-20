import { defineComponent } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { ICON_PROPS } from './props'
import './style.scss'

const [name, bem] = createNamespace('icon')

export default defineComponent({
  name,
  props: ICON_PROPS,
  emits: ['click'],
  setup(props, { emit, attrs, slots }) {
    return () => {
      const { color, size, spin, className } = props
      const wrapperClassName = [
        bem({
          [size]: size,
          spin: spin
        }),
        className,
        props.class,
        attrs?.class
      ].join('')

      const isCustomSize = !['small', 'medium', 'large'].includes(size)

      const iconStyle = {
        width: isCustomSize ? size : undefined,
        height: isCustomSize ? size : undefined,
        color
      }

      function handleClick(event: Event) {
        emit('click', event)
      }

      const children = slots.default?.()?.map((item) => ({
        ...item,
        props: {
          ...item.props,
          style: iconStyle
        }
      }))
      return (
        <span class={wrapperClassName} onClick={handleClick}>
          {children}
        </span>
      )
    }
  }
})
