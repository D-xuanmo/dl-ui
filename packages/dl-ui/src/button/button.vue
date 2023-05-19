<template>
  <button :class="wrapperClassName" :disabled="loading || disabled">
    <d-icon v-if="loading" name="loading" spin :class="iconLoadingClassName" color="inherit" />
    <d-icon v-if="icon" :name="icon" color="inherit" />
    <span :class="innerTextClassName"><slot /></span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { BUTTON_PROPS } from './props'
import { DIcon } from '../icon'

const [name, bem] = createNamespace('button')

export default defineComponent({
  name,
  components: {
    DIcon
  },
  props: BUTTON_PROPS,
  setup(props) {
    const wrapperClassName = computed(() =>
      bem({
        [`theme-${props.theme}`]: true,
        [`size-${props.size}`]: true,
        [`shape-${props.shape}`]: !props.link,
        [`fill-${props.fill}`]: !props.link,
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
