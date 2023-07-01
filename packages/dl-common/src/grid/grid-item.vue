<template>
  <div :class="className" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { GRID_ITEM_PROPS } from './props'

const [name, bem] = createNamespace('grid-item')

export default defineComponent({
  name,
  props: GRID_ITEM_PROPS,
  setup(props) {
    const className = bem()

    const style = computed<CSSProperties>(() => ({
      gridRow: `span ${props.row} / span ${props.row}`,
      gridColumn: `span ${props.column} / span 1`,
      height: addUnit(props.height)
    }))

    return {
      className,
      style
    }
  }
})
</script>
