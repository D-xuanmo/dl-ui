<template>
  <teleport :to="teleport">
    <d-overlay
      v-if="overlay"
      :visible="visible"
      :overlay-class="overlayClass"
      :z-index="overlayZIndex"
      :overlay-style="overlayStyle"
      @click="handleClose"
    />
    <transition
      :name="transitionPosition"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="visible"
        :class="bem('container')"
        :style="style"
        @click="closeOnClickOverlay && handleClose()"
      >
        <div :class="classes" :style="popupStyle" @click.stop>
          <header v-if="!isCenter && title" center :class="bem('header')">
            <div :class="bem('header', 'title', true)">{{ title }}</div>
            <d-icon
              v-if="closeable"
              :name="closeIcon"
              :class="bem('header', 'icon', true)"
              @click="handleClickIcon"
            />
          </header>
          <div :class="bem('content')"><slot /></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { createNamespace } from '../utils'
import DOverlay from '../overlay'
import useZIndex from '../hooks/useZIndex'
import { POPUP_PROPS } from './props'

const [name, bem] = createNamespace('popup')

export default defineComponent({
  name,
  components: { DOverlay },
  props: POPUP_PROPS,
  emits: ['update:visible', 'open', 'opened', 'close', 'closed', 'click-overlay-icon'],
  setup(props, { emit }) {
    const isCenter = computed(() => props.placement === 'center')

    const classes = computed(() =>
      [
        bem('wrapper', {
          [props.placement]: props.placement,
          round: props.round,
          notCenter: isCenter
        }),
        props.popupClass
      ].join(' ')
    )

    const [overlayZIndex] = useZIndex(props)
    const [zIndex] = useZIndex(props)

    const transitionPosition = computed(() => `${name}-${props.placement}`)

    const style = computed<CSSProperties>(() => ({
      zIndex: zIndex.value,
      transitionDuration:
        typeof props.duration === 'number' ? `${props.duration}s` : (props.duration as string)
    }))

    const onEnter = () => emit('open')
    const onAfterEnter = () => emit('opened')
    const onLeave = () => emit('close')
    const onAfterLeave = () => emit('closed')
    const handleClose = () => emit('update:visible', false)
    const handleClickIcon = () => {
      handleClose()
      emit('click-overlay-icon')
    }

    return {
      transitionPosition,
      classes,
      style,
      overlayZIndex,
      isCenter,
      bem,
      handleClose,
      onEnter,
      onAfterEnter,
      onLeave,
      onAfterLeave,
      handleClickIcon
    }
  }
})
</script>
