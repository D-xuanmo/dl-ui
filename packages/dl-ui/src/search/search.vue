<template>
  <div :class="wrapperClassName">
    <div :class="bodyClassName">
      <search-outlined size="small" color="var(--d-secondary-text-color)" />
      <d-input
        :model-value="innerValue"
        :name="name"
        :class="bem('input')"
        :placeholder="placeholder"
        :clearable="clearable"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :input-align="inputAlign"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        :formatter="formatter"
        :formatter-trigger="formatterTrigger"
        @update:model-value="onInternalChange"
        @clear="onReset"
        @blur="onBlur"
        @focus="onFocus"
        @keyup.enter="onQuickSearch"
      />
      <filter-outlined
        v-if="advancedSearch"
        size="small"
        :class="searchIconClass"
        @click="popupVisible = true"
      />
    </div>
    <d-button v-if="showCancel && showCancelButton" link theme="primary" @click="onCancel">
      取消
    </d-button>
  </div>
  <d-popup
    v-if="advancedSearch"
    v-model:visible="popupVisible"
    :popup-container-class="bem('advanced-search')"
    popup-class="safe-area-inset-top"
    placement="right"
    closable
    :title="advancedSearchTitle"
  >
    <d-form v-bind="formProps" client-type="MOBILE" :store="formStore" />
    <template #footer>
      <div :class="bem('advanced-search-footer')">
        <d-button size="large" @click="onReset">{{ searchResetText }}</d-button>
        <d-button theme="primary" size="large" @click="onConfirm">{{ searchConfirmText }}</d-button>
      </div>
    </template>
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import {
  createNamespace,
  useModelValue,
  DPopup,
  DForm,
  DButton,
  FormStore
} from '@xuanmo/dl-common'
import { SearchOutlined, FilterOutlined } from '@xuanmo/dl-icons'
import DInput from '../input'
import { SEARCH_PROPS } from './props'
import { isEmpty } from '@xuanmo/utils'

const [name, bem] = createNamespace('search')

export default defineComponent({
  name,
  components: { DInput, DPopup, DForm, DButton, SearchOutlined, FilterOutlined },
  props: SEARCH_PROPS,
  emits: ['update:model-value', 'focus', 'blur', 'confirm', 'reset', 'quick-search', 'cancel'],
  setup(props, ctx) {
    const [innerValue, setInnerValue] = useModelValue(props, ctx.emit as SetupContext['emit'])
    const popupVisible = ref(false)
    const searchActive = ref(false)
    const wrapperClassName = bem()
    const bodyClassName = computed(() =>
      bem('body', {
        round: props.round
      })
    )
    const searchIconClass = computed(() =>
      bem('advanced-search-icon', {
        active: searchActive.value
      })
    )
    const showCancel = ref(false)

    const formStore = new FormStore() || (props.formProps?.store as FormStore)

    const onInternalChange = (value: string) => {
      showCancel.value = true
      setInnerValue(value)
    }

    const onBlur = (value: string, event: MouseEvent) => {
      ctx.emit('blur', value, event)
    }

    const onFocus = (value: string, event: MouseEvent) => {
      ctx.emit('focus', value, event)
    }

    const onConfirm = () => {
      formStore.validate().then(() => {
        searchActive.value = true
        popupVisible.value = false
        showCancel.value = true
        ctx.emit('confirm', formStore.getFormData())
      })
    }

    const onQuickSearch = () => {
      showCancel.value = true
      ctx.emit('quick-search', innerValue.value)
    }

    const onReset = () => {
      searchActive.value = false
      formStore.reset()
      ctx.emit('reset')
    }

    const onCancel = () => {
      showCancel.value = false
      setInnerValue('')
      onReset()
      ctx.emit('cancel')
    }

    ctx.expose({ formStore })

    watch(
      () => innerValue.value,
      (value) => (showCancel.value = !isEmpty(value))
    )

    return {
      bem,
      wrapperClassName,
      bodyClassName,
      searchIconClass,
      innerValue,
      popupVisible,
      formStore,
      searchActive,
      showCancel,
      onInternalChange,
      onBlur,
      onFocus,
      onConfirm,
      onReset,
      onQuickSearch,
      onCancel
    }
  }
})
</script>
