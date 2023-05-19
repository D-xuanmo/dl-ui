import { computed, defineComponent } from 'vue'
import { createNamespace, addUnit } from '@xuanmo/dl-common'
import { SPACE_PROPS } from './props'

const [name, bem] = createNamespace('space')

export default defineComponent({
  name,
  props: SPACE_PROPS,
  setup(props, { slots }) {
    return () => {
      const wrapperClassName = computed(() =>
        bem({
          [props.direction]: props.direction,
          [`justify-${props.justify}`]: props.justify,
          [`align-${props.align}`]: props.align,
          wrap: props.wrap
        })
      )
      const children = slots.default?.() ?? []
      const spaceItemClassName = bem('item')
      const spaceItems = children.map((item, index) => {
        const style = {
          marginRight:
            props.direction === 'horizontal' && children.length - 1 !== index
              ? addUnit(props.gap)
              : undefined,
          marginBottom:
            (props.direction === 'vertical' || props.wrap) && children.length - 1 !== index
              ? addUnit(props.gap)
              : undefined
        }
        return (
          <div key={`${index}`} className={spaceItemClassName} style={style}>
            {item}
          </div>
        )
      })

      return <div className={wrapperClassName.value}>{spaceItems}</div>
    }
  }
})
