import { computed, defineComponent } from 'vue'
import { createNamespace, addUnit } from '../utils'
import { SPACE_PROPS } from './props'

const [name, bem] = createNamespace('space')

export default defineComponent({
  name,
  props: SPACE_PROPS,
  setup(props, { slots, attrs }) {
    return () => {
      const wrapperClassName = computed(() => [
        bem({
          [props.direction]: props.direction,
          [`justify-${props.justify}`]: props.justify,
          [`align-${props.align}`]: props.align,
          wrap: props.wrap
        }),
        attrs.class
      ])
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
          <div key={`${index}`} class={spaceItemClassName} style={style}>
            {item}
          </div>
        )
      })

      return <div class={wrapperClassName.value}>{spaceItems}</div>
    }
  }
})
