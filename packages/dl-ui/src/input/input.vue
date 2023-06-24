<template>
  <d-cell
    :title="`${colon ? `${label}：` : label}`"
    :title-class="labelClass"
    :title-width="labelWidth"
    :title-align="labelAlign"
    :required="required"
    :disabled="disabled"
    :hide-title="hideLabel"
  >
    <template v-if="leftIcon" #left-icon>
      <component :is="leftIcon" v-bind="leftIconProps" />
    </template>
    <template v-if="innerValue && clearable" #right-icon>
      <close-filled color="var(--d-secondary-text-color)" @click="handleClear" />
    </template>
    <input
      :value="innerValue"
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

    <template v-if="suffix" #suffix>
      <slot name="suffix">
        {{ suffix }}
      </slot>
    </template>
  </d-cell>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import { createNamespace, useModelValue } from '@xuanmo/dl-common'
import Cell from '../cell'
import { INPUT_PROPS } from './props'
import { CloseFilled } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('input')

export default defineComponent({
  name,
  components: {
    Cell,
    CloseFilled
  },
  props: INPUT_PROPS,
  emits: ['update:model-value', 'blur', 'clear', 'focus', 'click-input'],
  setup(props, { emit }) {
    const inputClassName = computed(() =>
      bem({
        disabled: props.disabled,
        readonly: props.readonly,
        [`${props.inputAlign}`]: props.inputAlign
      })
    )

    const [innerValue, setValue] = useModelValue<string | number | undefined, typeof props>(
      props,
      emit as SetupContext['emit']
    )

    function handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      const newValue =
        props.formatterTrigger === 'onChange' && props.formatter ? props.formatter(value) : value
      setValue(newValue)
    }

    function handleClear(event: MouseEvent) {
      emit('update:model-value', '')
      emit('clear', '', event)
    }

    function handleBlur(event: Event) {
      const value = innerValue.value
      const newValue =
        props.formatterTrigger === 'onChange' && props.formatter ? props.formatter(value) : value
      setValue(newValue)
      emit('blur', newValue, event)
    }

    function handleFocus(event: Event) {
      emit('focus', innerValue, event)
    }

    function handleClick(event: MouseEvent) {
      emit('click-input', innerValue.value, event)
    }

    return {
      bem,
      innerValue,
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
