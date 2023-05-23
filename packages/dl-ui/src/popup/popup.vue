<template>
  <teleport :to="(teleport as string)">
    <DOverlay
      v-if="overlay"
      :visible="visible"
      :overlay-class="overlayClass"
      :z-index="overlayZIndex"
      :overlay-style="overlayStyle"
      @click="handleClose"
    />
    <transition
      :name="transitionPosition"
      :appear="transitionAppear"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="visible"
        :class="[bem('container'), popupContainerClass]"
        :style="style"
        @click="closeOnClickOverlay && handleClose()"
      >
        <div :class="wrapperClassName" :style="popupStyle" @click.stop>
          <header v-if="showHeader" center :class="bem('header')">
            <div v-if="$slots['header-left']" :class="bem('header', 'left', true)">
              <slot name="header-left" />
            </div>
            <div :class="bem('header', 'title', true)">{{ title }}</div>
            <div v-if="$slots['header-right']" :class="bem('header', 'right', true)">
              <slot name="header-right" />
            </div>
            <span
              v-if="closeable"
              :class="bem('header', 'closable', true)"
              @click="handleClickIcon"
            >
              <slot name="close-icon"><CloseOutlined size="large" /></slot>
            </span>
          </header>
          <div :class="[bem('body'), popupBodyClass]"><slot /></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import DOverlay from '../overlay'
import useZIndex from '../hooks/use-z-index'
import { POPUP_PROPS } from './props'
import { CloseOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('popup')

export default defineComponent({
  name,
  components: { DOverlay, CloseOutlined },
  props: POPUP_PROPS,
  emits: ['update:visible', 'open', 'opened', 'close', 'closed', 'click-overlay-icon'],
  setup(props, { emit, slots }) {
    const isCenter = computed(() => props.placement === 'center')

    const showHeader = computed(() => {
      return (
        !isCenter.value &&
        (props.title || props.closeable || slots['header-left'] || slots['header-right'])
      )
    })

    const wrapperClassName = computed(() =>
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
      wrapperClassName,
      style,
      overlayZIndex,
      isCenter,
      showHeader,
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
