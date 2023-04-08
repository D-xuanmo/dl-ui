<template>
  <teleport :to="teleport">
    <transition
      :name="name"
      @before-enter="onTransitionBefore"
      @after-leave="onTransitionAfterLeave"
    >
      <div
        v-if="innerVisible"
        :class="[bem(), overlayClass].join(' ')"
        :style="style"
        @click.stop="handleClose"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, SetupContext, computed } from 'vue'
import { createNamespace } from '../utils'
import useDefault from '../hooks/useDefault'
import useZIndex from '../hooks/useZIndex'
import { PREFIX } from '../constants/prefix'
import { OVERLAY_PROPS } from './props'

const [name, bem] = createNamespace('overlay')

export default defineComponent({
  name,
  props: OVERLAY_PROPS,
  emits: ['update:visible', 'click'],
  setup(props, { emit }) {
    const [innerVisible, setVisible] = useDefault<boolean | undefined, typeof props, 'visible'>(
      props,
      emit as SetupContext['emit'],
      'visible',
      'update:visible'
    )

    const [zIndex, setZIndex] = useZIndex(props, props.zIndex !== undefined)

    setZIndex()

    const style = computed<CSSProperties>(() => ({
      zIndex: zIndex.value,
      transitionDuration:
        typeof props.duration === 'number' ? `${props.duration}s` : (props.duration as string),
      ...(props.overlayStyle ?? {})
    }))

    function onTransitionBefore() {
      document.body.classList.add(`${PREFIX}-overflow-hidden`)
    }

    function onTransitionAfterLeave() {
      document.body.classList.remove(`${PREFIX}-overflow-hidden`)
    }

    function handleClose() {
      if (props.closeOnClickOverlay) {
        setVisible((innerVisible.value = !innerVisible.value))
        emit('click')
      }
    }

    return {
      name,
      innerVisible,
      style,
      bem,
      handleClose,
      onTransitionBefore,
      onTransitionAfterLeave
    }
  }
})
</script>
