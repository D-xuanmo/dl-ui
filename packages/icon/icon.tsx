import { defineComponent, PropType } from 'vue'
import { createNamespace } from '@/utils/bem'

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
    type: String as PropType<'small' | 'medium' | 'large'>,
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
      return (
        <span className={wrapperClassName}>
          <svg aria-hidden="true">
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
