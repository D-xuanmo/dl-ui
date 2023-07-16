<template>
  <teleport :to="(teleport as string)">
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
      :appear="transitionAppear"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <template v-if="isLoaded">
        <div
          v-show="visible"
          :class="[bem('container'), popupContainerClass]"
          :style="style"
          @click="closeOnOverlayClick && handleClose()"
        >
          <div :class="wrapperClassName" :style="popupStyle" @click.stop>
            <header v-if="showHeader" :class="[bem('header'), popupHeaderClass]">
              <div v-if="$slots['header-left']" :class="bem('header-left')">
                <slot name="header-left" />
              </div>
              <slot name="title">
                <div :class="bem('header-title')">{{ title }}</div>
              </slot>
              <div v-if="$slots['header-right']" :class="bem('header-right')">
                <slot name="header-right" />
              </div>
              <span v-if="closable" :class="bem('header-closable')" @click="handleClickIcon">
                <slot name="close-icon"><close-outlined /></slot>
              </span>
            </header>
            <div :class="[bem('body'), popupBodyClass]"><slot /></div>
            <slot name="footer" />
          </div>
        </div>
      </template>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref, watch } from 'vue'
import { useZIndex } from '../hooks'
import { createNamespace } from '../utils'
import DOverlay from '../overlay'
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
    const isLoaded = ref(props.visible ? true : !props.lazyRender)

    const showHeader = computed(() => {
      return (
        props.title ||
        props.closable ||
        slots['title'] ||
        slots['header-left'] ||
        slots['header-right']
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
    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }
    const handleClickIcon = () => {
      handleClose()
      emit('click-overlay-icon')
    }

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          isLoaded.value = true
        }
      }
    )

    return {
      transitionPosition,
      wrapperClassName,
      style,
      overlayZIndex,
      isCenter,
      showHeader,
      isLoaded,
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
