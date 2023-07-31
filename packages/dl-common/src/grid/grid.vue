<template>
  <div :class="wrapperClassName" :style="gridStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { AlignEnum, GRID_PROPS, JustifyEnum } from './props'
import { isEmpty } from '@xuanmo/utils'

const [name, bem] = createNamespace('grid')

export default defineComponent({
  name,
  props: GRID_PROPS,
  setup(props) {
    const wrapperClassName = bem()

    const gridStyle = computed<CSSProperties>(() => {
      const justify: Record<JustifyEnum, string> = {
        left: 'start',
        center: 'center',
        right: 'end'
      }
      const align: Record<AlignEnum, string> = {
        top: 'start',
        middle: 'center',
        bottom: 'end'
      }
      const style: CSSProperties = {
        gridTemplateRows: props.rows,
        gridTemplateColumns:
          typeof props.columns === 'number' ? `repeat(${props.columns}, 1fr)` : props.columns,
        gap: addUnit(props.gap),
        justifyItems: justify[props.justify],
        alignContent: align[props.align]
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
