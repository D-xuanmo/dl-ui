import { computed, defineComponent } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { SPACE_PROPS } from './props'
import { findChildren } from '../utils/find-children'

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
      const children = findChildren(slots.default?.() ?? [])

      return (
        <div class={wrapperClassName.value} style={{ gap: addUnit(props.gap) }}>
          {children}
        </div>
      )
    }
  }
})
