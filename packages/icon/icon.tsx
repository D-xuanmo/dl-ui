import { defineComponent, PropType } from 'vue'
import { createNamespace } from '@/utils/bem'
import { SizeEnum } from '@/common'

const [name, bem] = createNamespace('icon')

const props = {
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
  className: String
}

export default defineComponent({
  name,
  props,
  setup(props) {
    return () => {
      const { color, size, className = '' } = props
      const wrapperClassName = [
        bem({
          [size]: size
        }),
        className
      ].join('')

      const isCustomSize = !['small', 'medium', 'large'].includes(size)

      const iconStyle = {
        width: size,
        height: size
      }

      return (
        <span className={wrapperClassName}>
          <svg
            aria-hidden="true"
            style={isCustomSize ? iconStyle : undefined}
          >
            <use
              xlinkHref={`#d-icon-${props.name}`}
              style={{ color }}
            />
          </svg>
        </span>
      )
    }
  }
})
