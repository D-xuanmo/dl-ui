<template>
  <li :class="itemClassName" :style="itemHeight">
    <span>{{ option.label }}</span>
  </li>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { SCROLL_RADIO_ITEM_PROPS } from './props'

const [name, bem] = createNamespace('scroll-radio__item')

export default defineComponent({
  name,
  props: SCROLL_RADIO_ITEM_PROPS,
  setup(props) {
    const itemClassName = computed(() =>
      bem({
        disabled: props.option?.disabled
      })
    )

    const itemHeight = computed<CSSProperties>(() => ({
      height: addUnit(props.optionHeight),
      lineHeight: addUnit(props.optionHeight)
    }))

    return {
      itemClassName,
      itemHeight
    }
  }
})
</script>
