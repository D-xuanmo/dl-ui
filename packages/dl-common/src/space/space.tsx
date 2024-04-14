import { computed, defineComponent } from 'vue'
import { addUnit, createNamespace } from '../utils'
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
        return (
          <div key={`${index}`} class={spaceItemClassName}>
            {item}
          </div>
        )
      })

      return (
        <div class={wrapperClassName.value} style={{ gap: addUnit(props.gap) }}>
          {spaceItems}
        </div>
      )
    }
  }
})
