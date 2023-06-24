<template>
  <div :class="wrapperClassName" :style="gridStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { GRID_PROPS } from './props'
import { isEmpty } from '@xuanmo/utils'

const [name, bem] = createNamespace('grid')

export default defineComponent({
  name,
  props: GRID_PROPS,
  setup(props) {
    const wrapperClassName = bem()

    const gridStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {
        gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
        gap: addUnit(props.gap)
      }
      if (!isEmpty(props.rowGap)) {
        Object.assign(style, {
          rowGap: addUnit(props.rowGap)
        })
      }
      if (!isEmpty(props.columnGap)) {
        Object.assign(style, {
          columnGap: addUnit(props.columnGap)
        })
      }
      return style
    })

    return {
      wrapperClassName,
      gridStyle
    }
  }
})
</script>
