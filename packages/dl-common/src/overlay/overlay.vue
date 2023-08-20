<template>
  <teleport :to="(teleport as string)">
    <transition
      :name="name"
      @before-enter="onTransitionBefore"
      @after-leave="onTransitionAfterLeave"
    >
      <template v-if="isLoaded">
        <div
          v-show="innerVisible"
          :class="[bem(), overlayClass].join(' ')"
          :style="style"
          @click.stop="handleClose"
        >
          <slot />
        </div>
      </template>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, SetupContext, computed, ref, watch } from 'vue'
import { createNamespace } from '../utils'
import { useModelValue, useZIndex } from '../hooks'
import { PREFIX } from '../constants'
import { OVERLAY_PROPS } from './props'
import { isEmpty } from '@xuanmo/utils'

const [name, bem] = createNamespace('overlay')

export default defineComponent({
  name,
  props: OVERLAY_PROPS,
  emits: ['update:visible', 'click'],
  setup(props, { emit }) {
    const [innerVisible, setVisible] = useModelValue<boolean | undefined, typeof props, 'visible'>(
      props,
      emit as SetupContext['emit'],
      'visible',
      'update:visible'
    )
    const isLoaded = ref(props.visible ? true : !props.lazyRender)

    const [zIndex] = isEmpty(props.zIndex) ? useZIndex(props) : [ref(props.zIndex)]

    const style = computed<CSSProperties>(() => ({
      zIndex: zIndex.value,
      transitionDuration:
        typeof props.duration === 'number' ? `${props.duration}s` : (props.duration as string),
      ...(props.overlayStyle ?? {})
    }))

    function onTransitionBefore() {
      if (props.lockScroll) {
        document.body.classList.add(`${PREFIX}-overflow-hidden`)
      }
    }

    function onTransitionAfterLeave() {
      if (props.lockScroll) {
        document.body.classList.remove(`${PREFIX}-overflow-hidden`)
      }
    }

    function handleClose() {
      if (props.closeOnClickOverlay) {
        setVisible((innerVisible.value = !innerVisible.value))
        emit('click')
      }
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
      name,
      innerVisible,
      style,
      isLoaded,
      bem,
      handleClose,
      onTransitionBefore,
      onTransitionAfterLeave
    }
  }
})
</script>
