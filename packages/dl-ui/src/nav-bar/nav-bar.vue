<template>
  <div :class="wrapperClass">
    <div v-if="leftText || backArrow" :class="leftClass" @click="onLeftClick">
      <slot name="left">
        <left-outlined v-if="backArrow" />
        {{ leftText }}
      </slot>
    </div>
    <div :class="centerClass">{{ title }}</div>
    <div v-if="rightText" :class="rightClass" @click="onRightClick">
      <slot name="right">{{ rightText }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { NAV_BAR_PROPS } from './props'
import { createNamespace } from '@xuanmo/dl-common'
import { LeftOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('nav-bar')

export default defineComponent({
  name,
  components: { LeftOutlined },
  props: NAV_BAR_PROPS,
  emits: ['click-left', 'click-right'],
  setup(props, ctx) {
    const wrapperClass = computed(() =>
      bem({ border: props.border, highlight: props.buttonHighlight })
    )
    const leftClass = bem('left')
    const centerClass = bem('title', { [props.titleAlign]: true })
    const rightClass = bem('right')

    const onLeftClick = () => {
      ctx.emit('click-left')
    }

    const onRightClick = () => {
      ctx.emit('click-right')
    }

    return {
      wrapperClass,
      leftClass,
      centerClass,
      rightClass,
      onLeftClick,
      onRightClick
    }
  }
})
</script>
