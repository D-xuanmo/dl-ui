<template>
  <button :class="wrapperClassName" :disabled="loading || disabled">
    <d-icon v-if="loading" name="loading" spin :class="iconLoadingClassName" color="inherit" />
    <d-icon v-if="icon" :name="icon" color="inherit" />
    <span :class="innerTextClassName"><slot /></span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils/bem'
import { buttonProps } from './props'
import { Icon } from '../components'

const [name, bem] = createNamespace('button')

export default defineComponent({
  name,
  components: {
    [Icon.name]: Icon
  },
  props: buttonProps,
  setup(props) {
    const wrapperClassName = computed(() =>
      bem({
        [`theme-${props.theme}`]: true,
        [`size-${props.size}`]: true,
        [`shape-${props.shape}`]: true,
        [`fill-${props.fill}`]: true,
        block: props.block,
        disabled: props.disabled
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
