<template>
  <button :class="[wrapperClassName, $attrs.class]" :disabled="loading || disabled">
    <loading-outlined v-if="loading" spin :class="iconLoadingClassName" color="inherit" />
    <slot name="icon" />
    <span :class="innerTextClassName"><slot /></span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils'
import { BUTTON_PROPS } from './props'
import { LoadingOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('button')

export default defineComponent({
  name,
  components: {
    LoadingOutlined
  },
  props: BUTTON_PROPS,
  setup(props) {
    const wrapperClassName = computed(() =>
      bem({
        [`theme-${props.theme}`]: true,
        [`size-${props.size}`]: true,
        [`shape-${props.shape}`]: !props.link,
        'fill-outline': props.dashed,
        dashed: props.dashed,
        [`fill-${props.fill}`]: !props.link && !props.dashed,
        block: props.block,
        disabled: props.disabled,
        'is-link': props.link
      })
    )
    return {
      wrapperClassName,
      innerTextClassName: bem('text'),
      iconLoadingClassName: bem('icon-loading'),
      customIconClassName: bem('custom-icon')
    }
  }
})
</script>