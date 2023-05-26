<template>
  <Teleport :to="(teleport as string)">
    <Transition :name="name" appear>
      <div v-if="visible" :class="containerClassName">
        <div :class="contentClassName">
          <template v-if="type === 'text'">
            <TipsFilled v-if="theme === 'info'" color="var(--d-primary)" />
            <CheckCircleFilled v-if="theme === 'success'" color="var(--d-success)" />
            <WarningFilled v-if="theme === 'warning'" color="var(--d-warning)" />
            <CloseFilled v-if="theme === 'error'" color="var(--d-error)" />
          </template>
          <template v-else-if="type === 'loading'">
            <Loading2Outlined spin color="var(--d-primary)" />
          </template>
          <span :class="textClassName">{{ content }}</span>
          <CloseOutlined
            v-if="closeable"
            :class="closeIconClassName"
            size="small"
            @click="handleClose"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { MESSAGE_PROPS, MessageProps } from './props'
import useModelValue from '../hooks/use-model-value'
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
