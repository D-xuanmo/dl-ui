<template>
  <teleport :to="(teleport as string)">
    <transition :name="name" appear>
      <div v-if="visible" :class="containerClassName">
        <div :class="contentClassName">
          <template v-if="type === 'text'">
            <tips-filled v-if="theme === 'info'" size="small" color="var(--d-primary)" />
            <check-circle-filled v-if="theme === 'success'" size="small" color="var(--d-success)" />
            <warning-filled v-if="theme === 'warning'" size="small" color="var(--d-warning)" />
            <close-filled v-if="theme === 'error'" size="small" color="var(--d-error)" />
          </template>
          <template v-else-if="type === 'loading'">
            <loading2-outlined size="small" spin color="var(--d-primary)" />
          </template>
          <span :class="textClassName">{{ content }}</span>
          <close-outlined
            v-if="closeable"
            :class="closeIconClassName"
            size="small"
            @click="handleClose"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { createNamespace } from '../utils'
import { MESSAGE_PROPS, MessageProps } from './props'
import { useModelValue } from '../hooks'
import {
  CheckCircleFilled,
  CloseFilled,
  WarningFilled,
  TipsFilled,
  CloseOutlined,
  Loading2Outlined
} from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('message')

export default defineComponent({
  name,
  components: {
    CheckCircleFilled,
    CloseFilled,
    WarningFilled,
    TipsFilled,
    CloseOutlined,
    Loading2Outlined
  },
  inheritAttrs: false,
  props: MESSAGE_PROPS,
  emits: ['update:visible'],
  setup(props, { emit }) {
    const containerClassName = bem()
    const contentClassName = bem('content')
    const textClassName = bem('text')
    const closeIconClassName = bem('closeable')

    const [innerVisible, updateVisible] = useModelValue<
      boolean,
      MessageProps,
      'visible',
      'update:visible'
    >(props as any, emit as any, 'visible', 'update:visible')

    const handleClose = () => {
      updateVisible(false)
    }

    watch(
      () => props.visible,
      (visible) => {
        if (visible && props.duration > 0) {
          setTimeout(handleClose, props.duration)
        }
      }
    )

    return {
      name,
      containerClassName,
      contentClassName,
      closeIconClassName,
      innerVisible,
      textClassName,
      handleClose
    }
  }
})
</script>
