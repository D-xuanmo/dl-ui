<template>
  <Teleport :to="teleport">
    <Transition :name="name">
      <div
        v-if="innerVisible"
        :class="[bem(), overlayClass].join(' ')"
        :style="style"
        @click="handleClose"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, inject, SetupContext, getCurrentInstance, PropType, computed } from 'vue'
import { createNamespace } from '../utils/bem'
import useDefault from '../hooks/useDefault'
import { globalConfigKey } from '../constants/context'
import { isNumber } from '@xuanmo/javascript-utils'

const [name, bem] = createNamespace('overlay')

export default defineComponent({
  name,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: undefined
    },
    duration: {
      type: [Number, String] as PropType<number | string | undefined>,
      default: 0.3
    },
    overlayClass: {
      type: String,
      default: ''
    },
    overlayStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    },
    teleport: {
      type: String as PropType<string | HTMLElement>,
      default: 'body'
    }
  },
  emits: ['update:visible', 'click'],
  setup(props, context: SetupContext) {
    const { proxy } = getCurrentInstance() ?? {}
    const globalConfig = inject(globalConfigKey) ?? {}
    const [innerVisible, setVisible] = useDefault<boolean | undefined, typeof props, 'visible'>(
      props,
      context.emit,
      'visible',
      'update:visible'
    )

    const zIndex = props.zIndex ?? globalConfig?.zIndex

    // 每次打开弹框默认加 1
    const newZIndex = zIndex ? zIndex + 1 : (proxy?.$DForm?.zIndex ?? 2000) + 1

    const style = computed<CSSProperties>(() => ({
      zIndex: newZIndex,
      transitionDuration: isNumber(props.duration) ? `${props.duration}s` : (props.duration as string),
      ...(props.overlayStyle ?? {})
    }))

    proxy!.$DForm.zIndex = newZIndex

    function handleClose() {
      setVisible((innerVisible.value = !innerVisible.value))
      context.emit('click')
    }

    return {
      name,
      innerVisible,
      style,
      bem,
      handleClose
    }
  }
})
</script>
