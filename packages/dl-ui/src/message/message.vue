<template>
  <DPopup
    v-bind="$attrs"
    :teleport="teleport"
    :visible="innerVisible"
    placement="top"
    :popup-container-class="containerClassName"
    :popup-class="wrapperClassName"
    :popup-body-class="contentClassName"
    :overlay="false"
    @update:visible="handleClose"
  >
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
    <CloseOutlined v-if="closeable" @click="handleClose" />
  </DPopup>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import DPopup from '../popup'
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
    DPopup,
    CheckCircleFilled,
    CloseFilled,
    WarningFilled,
    TipsFilled,
    CloseOutlined,
    Loading2Outlined
  },
  props: MESSAGE_PROPS,
  emits: ['update:visible'],
  setup(props, { emit }) {
    const containerClassName = bem()
    const wrapperClassName = bem('wrapper')
    const contentClassName = bem('content')
    const textClassName = bem('text')

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
      containerClassName,
      contentClassName,
      wrapperClassName,
      innerVisible,
      textClassName,
      handleClose
    }
  }
})
</script>
