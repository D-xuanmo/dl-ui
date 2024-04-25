<template>
  <span :class="triggerClassName" @click="showPicker">
    <slot>
      <span style="vertical-align: middle">{{ displayLabel || placeholder }}</span>
      <right-outlined v-if="!readonly" color="var(--d-secondary-text-color)" />
    </slot>
  </span>
  <d-popup
    :visible="visible"
    :title="title"
    :popup-class="wrapperClassName"
    :popup-body-class="bodyClassName"
    placement="bottom"
    round
    @update:visible="handleCancel"
    @close="handleCancel"
  >
    <template #header-left>
      <d-button v-if="cancelButtonText" link @click="handleCancel">
        {{ cancelButtonText }}
      </d-button>
      <d-button link @click="handleClear">清空</d-button>
    </template>
    <template #header-right>
      <d-button v-if="confirmButtonText" link theme="primary" @click="handleConfirm">
        {{ confirmButtonText }}
      </d-button>
    </template>
    <cascader-search :store="store" :search-placeholder="searchPlaceholder" />
    <cascader-search-panel v-if="store.searchKeywords.value" :store="store" />
    <cascader-content v-else :store="store" :lazy="lazy" :lazy-load="lazyLoad" />
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import { createCascaderNameSpace } from './utils'
import { CASCADER_PROPS } from './props'
import { isEmpty } from '@xuanmo/utils'
import { CascaderValue, useModelValue, DPopup, DButton, useConfig } from '@xuanmo/dl-common'
import { RightOutlined } from '@xuanmo/dl-icons'
import { CascaderStore } from './store'
import CascaderContent from './cascader-content.vue'
import CascaderSearch from './cascader-search.vue'
import CascaderSearchPanel from './cascader-search-panel.vue'

const [name, bem] = createCascaderNameSpace()

export default defineComponent({
  name,
  components: {
    RightOutlined,
    DPopup,
    DButton,
    CascaderContent,
    CascaderSearch,
    CascaderSearchPanel
  },
  inheritAttrs: false,
  props: CASCADER_PROPS,
  emits: ['update:model-value', 'confirm', 'close', 'clear'],
  setup(props, { emit }) {
    const config = useConfig(['keys'], props)
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const store = new CascaderStore(innerValue.value, props.options, { keys: config.value.keys })
    const wrapperClassName = bem()
    const bodyClassName = bem('body')
    const displayLabel = ref('')

    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: isEmpty(innerValue.value) || isEmpty(displayLabel.value),
        readonly: props.readonly,
        disabled: props.disabled
      })
    )

    const visible = ref(false)

    const showPicker = () => {
      if (props.readonly || props.disabled) return
      visible.value = true
    }

    const hidePicker = () => {
      visible.value = false
    }

    const handleClear = () => {
      updateValue([])
      store.updateByValue([])
      displayLabel.value = store.getDisplayLabel()
      hidePicker()
      emit('clear')
    }

    const handleConfirm = () => {
      const value = store.getValue() as CascaderValue
      hidePicker()
      updateValue(value)
      displayLabel.value = store.getDisplayLabel()
      emit('confirm', value)
    }

    const handleCancel = () => {
      store.updateByValue(innerValue.value)
      hidePicker()
      emit('close')
    }

    watch(
      () => props.options,
      (originalOptions) => {
        store.updateByOptions(originalOptions, innerValue.value)
        displayLabel.value = store.getDisplayLabel()
      }
    )

    watch(
      () => innerValue.value,
      (value) => {
        store.updateByValue(value)
        displayLabel.value = store.getDisplayLabel()
      },
      {
        immediate: true
      }
    )

    return {
      wrapperClassName,
      triggerClassName,
      bodyClassName,
      visible,
      displayLabel,
      store,
      bem,
      showPicker,
      handleCancel,
      handleConfirm,
      handleClear
    }
  }
})
</script>
