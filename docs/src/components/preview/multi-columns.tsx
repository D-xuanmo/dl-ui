import { defineComponent, useSlots } from 'vue'
import { classNames } from '@doc/utils'

export default defineComponent({
  name: 'MultiColumns',
  props: {
    columns: {
      type: String,
      default: '1'
    }
  },
  setup() {
    const slots = useSlots()
    const leftChildren: any[] = []
    const rightChildren: any[] = []
    const children = slots.default?.()
    children?.forEach((item, index) => {
      if (index % 2 === 0) {
        leftChildren.push(item)
      }
      if (index % 2 === 1) {
        rightChildren.push(item)
      }
    })

    return () => {
      return (
        <div class={classNames('multi-columns')}>
          <div class={classNames('multi-columns', 'item', true)}>{leftChildren}</div>
          <div class={classNames('multi-columns', 'item', true)}>{rightChildren}</div>
        </div>
      )
    }
  }
})
