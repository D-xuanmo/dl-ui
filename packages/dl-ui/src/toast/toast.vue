<template>
  <d-popup
    :visible="innerVisible"
    :overlay="false"
    :popup-container-class="bem()"
    :popup-class="bem('wrapper')"
    :popup-body-class="bem('content', { [direction]: true })"
  >
    <check-circle-outlined v-if="theme === 'success'" />
    <close-circle-outlined v-if="theme === 'error'" />
    <loading-outlined v-if="theme === 'loading'" spin />
    <span :class="bem('text')">
      <slot>{{ content }}</slot>
    </span>
  </d-popup>
</template>

<script lang="ts">
import { defineComponent, watch, SetupContext } from 'vue'
import { createNamespace, DPopup, useModelValue } from '@xuanmo/dl-common'
import { TOAST_PROPS, ToastProps } from './props'
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('toast')

export default defineComponent({
  name,
  components: { DPopup, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined },
  props: TOAST_PROPS,
  emits: ['update:visible'],
  setup(props, { emit }) {
    const [innerVisible, updateVisible] = useModelValue<boolean, ToastProps, 'visible'>(
      props,
      emit as SetupContext['emit'],
      'visible',
      'update:visible'
    )

    const handleClose = () => {
      if (props.duration === 0) return
      const timer = setTimeout(() => {
        updateVisible(false)
        clearTimeout(timer)
      }, props.duration)
    }

    watch(
      () => innerVisible.value,
      (visible) => {
        if (visible) handleClose()
      }
    )

    return {
      bem,
      innerVisible
    }
  }
})
</script>
