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
        @clear="onClear"
        @blur="onBlur"
        @focus="onFocus"
      />
      <filter-outlined
        v-if="advancedSearch"
        size="small"
        :class="searchIconClass"
        @click="popupVisible = true"
      />
    </div>
  </div>
  <d-popup
    v-if="advancedSearch"
    v-model:visible="popupVisible"
    :popup-container-class="bem('advanced-search')"
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
import { computed, defineComponent, ref, SetupContext } from 'vue'
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

const [name, bem] = createNamespace('search')

export default defineComponent({
  name,
  components: { DInput, DPopup, DForm, DButton, SearchOutlined, FilterOutlined },
  props: SEARCH_PROPS,
  emits: ['update:model-value', 'clear', 'focus', 'blur', 'confirm', 'reset'],
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

    const formStore = new FormStore() || (props.formProps?.store as FormStore)

    const onInternalChange = (value: string) => {
      setInnerValue(value)
    }

    const onClear = (value: string, event: MouseEvent) => {
      ctx.emit('clear', value, event)
    }

    const onBlur = (value: string, event: MouseEvent) => {
      ctx.emit('blur', value, event)
    }

    const onFocus = (value: string, event: MouseEvent) => {
      ctx.emit('focus', value, event)
    }

    const onConfirm = () => {
      searchActive.value = true
      popupVisible.value = false
      ctx.emit('confirm', formStore.getFormData())
    }

    const onReset = () => {
      searchActive.value = false
      formStore.reset()
      ctx.emit('reset')
    }

    ctx.expose({ formStore })

    return {
      bem,
      wrapperClassName,
      bodyClassName,
      searchIconClass,
      innerValue,
      popupVisible,
      formStore,
      searchActive,
      onInternalChange,
      onClear,
      onBlur,
      onFocus,
      onConfirm,
      onReset
    }
  }
})
</script>
