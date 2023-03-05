import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../utils'
import { SizeEnum } from '../common'

const [name, bem] = createNamespace('icon')

export default defineComponent({
  name,
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'var(--d-primary-text-color)'
    },
    size: {
      type: String as PropType<SizeEnum | string>,
      default: 'medium'
    },
    className: {
      type: String,
      default: ''
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit, attrs }) {
    return () => {
      const { color, size, spin, className } = props
      const wrapperClassName = [
        bem({
          [size]: size,
          spin: spin
        }),
        className,
        attrs?.class
      ].join('')

      const isCustomSize = !['small', 'medium', 'large'].includes(size)

      const iconStyle = {
        width: size,
        height: size
      }

      function handleClick(event: Event) {
        emit('click', event)
      }

      return (
        <span class={wrapperClassName} onClick={handleClick}>
          <svg aria-hidden="true" style={isCustomSize ? iconStyle : undefined}>
            <use xlinkHref={`#d-icon-${props.name}`} style={{ color }} />
          </svg>
        </span>
      )
    }
  }
})
