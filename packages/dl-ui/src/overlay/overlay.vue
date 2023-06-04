<template>
  <teleport :to="(teleport as string)">
    <transition
      :name="name"
      @before-enter="onTransitionBefore"
      @after-leave="onTransitionAfterLeave"
    >
      <div
        v-show="innerVisible"
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
import { createNamespace, PREFIX } from '@xuanmo/dl-common'
import useModelValue from '../hooks/use-model-value'
import useZIndex from '../hooks/use-z-index'
import { OVERLAY_PROPS } from './props'

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
