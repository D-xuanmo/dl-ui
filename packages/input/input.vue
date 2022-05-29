<template>
  <Cell
    :title="`${colon ? `${label}：` : label}`"
    :title-class="labelClass"
    :title-width="labelWidth"
    :title-align="labelAlign"
    :left-icon="leftIcon"
    :left-icon-size="leftIconSize"
    :left-icon-color="leftIconColor"
    :required="required"
    :disabled="disabled"
    :hide-title="hideLabel"
    :right-icon="clearable ? 'close' : undefined"
    right-icon-color="var(--d-secondary-text-color)"
    :right-icon-props="{ onClick: handleClear }"
  >
    <input
      :value="modelValue"
      :type="type"
      :name="name"
      :class="inputClassName"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @click="handleClick"
    />

    <template #suffix>
      <slot name="suffix">
        {{ suffix }}
      </slot>
    </template>
  </Cell>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { createNamespace } from '@/utils/bem'
import Cell from '../cell'
import { FieldFormatterTrigger, HorizontalAlignEnum, SizeEnum } from '@/common'

const [name, bem] = createNamespace('input')

const props = {
  modelValue: [String, Number],

  type: {
    type: String as PropType<'text' | 'number' | 'password' | 'email' | 'url'>,
    default: 'text'
  },
  name: String,

  // label 相关参数
  label: String,
  labelClass: String,
  labelWidth: String,
  labelAlign: {
    type: String as PropType<HorizontalAlignEnum>,
    default: 'left'
  },
  hideLabel: Boolean,
  leftIcon: String,
  leftIconSize: String as PropType<SizeEnum | string>,
  leftIconColor: String,
  colon: Boolean,
  required: Boolean,

  // 内容相关参数
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  inputAlign: String as PropType<HorizontalAlignEnum>,
  maxlength: Number,
  suffix: String,
  autocomplete: String,
  clearable: Boolean,

  formatter: {
    type: Function as PropType<(value: string | number) => string>,
    default: null
  },
  formatterTrigger: {
    type: String as PropType<FieldFormatterTrigger>,
    default: 'onChange'
  }
}

export default defineComponent({
  name,
  components: {
    Cell
  },
  props,
  emits: ['update:modelValue', 'blur', 'clear', 'focus', 'click-input'],
  setup(props, { emit }) {
    const inputClassName = computed(() =>
      bem({
        disabled: props.disabled,
        readonly: props.readonly,
        right: props.suffix,
        [`${props.inputAlign}`]: props.inputAlign
      })
    )

    const innerValue = ref(props.modelValue ?? '')

    function handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      innerValue.value = props.formatterTrigger === 'onChange' && props.formatter ? props.formatter(value) : value
      emit('update:modelValue', innerValue.value)
    }

    function handleClear(event: MouseEvent) {
      emit('update:modelValue', '')
      emit('clear', '', event)
    }

    function handleBlur(event: Event) {
      const value = innerValue.value
      props.formatterTrigger === 'onChange' && props.formatter ? props.formatter(value) : value
      emit('blur', value, event)
    }

    function handleFocus(event: Event) {
      emit('focus', innerValue, event)
    }

    function handleClick(event: MouseEvent) {
      emit('click-input', innerValue.value, event)
    }

    return {
      bem,
      inputClassName,
      handleInput,
      handleClear,
      handleBlur,
      handleFocus,
      handleClick
    }
  }
})
</script>
