<template>
  <d-popup
    :visible="innerValue"
    :closable="closable"
    :close-on-overlay-click="closeOnOverlayClick"
    :popup-container-class="containerClass"
    :popup-class="wrapperClass"
    :popup-header-class="headerClass"
    :popup-body-class="bodyClass"
    :popup-style="style"
    @close="handleClose"
  >
    <template #title>
      <div :class="titleClass">
        <template v-if="showIcon">
          <check-circle-filled
            v-if="theme === 'success'"
            :class="titleIconClass"
            color="var(--d-success)"
          />
          <warning-filled
            v-if="theme === 'warning'"
            :class="titleIconClass"
            color="var(--d-warning)"
          />
          <close-filled v-if="theme === 'error'" :class="titleIconClass" color="var(--d-error)" />
          <tips-filled v-if="theme === 'info'" :class="titleIconClass" color="var(--d-primary)" />
        </template>
        <span :class="titleTextClass">{{ title }}</span>
      </div>
    </template>
    <template v-if="destroyOnClose">
      <slot v-if="innerValue">{{ content }}</slot>
    </template>
    <template v-else>
      <slot>{{ content }}</slot>
    </template>
    <template #footer>
      <d-space :class="footerClass" justify="end" :gap="8">
        <d-button :class="cancelButtonClass" size="small" fill="none" @click="handleClose">
          {{ cancelButtonText }}
        </d-button>
        <d-button :class="confirmButtonClass" size="small" theme="primary" @click="handleConfirm">
          {{ confirmButtonText }}
        </d-button>
      </d-space>
    </template>
  </d-popup>
</template>

<script lang="ts">
import { addUnit, createNamespace } from '../utils'
import { computed, CSSProperties, defineComponent, watch } from 'vue'
import { useModelValue } from '../hooks'
import { DIALOG_PROPS } from './props'
import { SetupContext } from 'vue'
import DPopup from '../popup'
import DButton from '../button'
import DSpace from '../space'
import { CheckCircleFilled, CloseFilled, TipsFilled, WarningFilled } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('dialog')

export default defineComponent({
  name,
  components: {
    DPopup,
    DButton,
    DSpace,
    CheckCircleFilled,
    CloseFilled,
    TipsFilled,
    WarningFilled
  },
  props: DIALOG_PROPS,
  emits: ['update:visible', 'confirm', 'cancel'],
  setup(props, context: SetupContext) {
    const containerClass = bem()
    const wrapperClass = bem('wrapper')
    const headerClass = bem('header')
    const titleClass = bem('title')
    const titleIconClass = bem('title-icon')
    const titleTextClass = bem('title-text')
    const bodyClass = bem('body')
    const footerClass = bem('footer')
    const cancelButtonClass = bem('cancel-button')
    const confirmButtonClass = bem('confirm-button')
    const [innerValue, setValue] = useModelValue(props, context.emit, 'visible', 'update:visible')

    const style = computed<CSSProperties>(() => ({
      top: addUnit(props.top),
      width: addUnit(props.width),
      height: addUnit(props.height)
    }))

    const handleClose = () => {
      setValue(false)
      context.emit('cancel')
    }

    const handleConfirm = () => {
      setValue(false)
      context.emit('confirm')
    }

    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27 || event.code === 'Escape') handleClose()
    }

    watch(
      () => innerValue.value,
      (visible) => {
        if (visible) {
          document.addEventListener('keydown', closeOnEsc)
        } else {
          document.removeEventListener('keydown', closeOnEsc)
        }
      }
    )

    return {
      containerClass,
      wrapperClass,
      headerClass,
      titleClass,
      titleTextClass,
      titleIconClass,
      bodyClass,
      footerClass,
      cancelButtonClass,
      confirmButtonClass,
      innerValue,
      style,
      handleClose,
      handleConfirm
    }
  }
})
</script>
