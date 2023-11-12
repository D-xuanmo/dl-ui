<template>
  <div :class="inputClassName">
    <input
      :value="innerValue"
      :type="type"
      :name="name"
      :class="innerClassName"
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
    <close-filled
      v-if="innerValue && clearable"
      :class="suffixIconClass"
      size="small"
      @click="handleClear"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import { createNamespace, useModelValue } from '@xuanmo/dl-common'
import { INPUT_PROPS } from './props'
import { CloseFilled } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('input')

export default defineComponent({
  name,
  components: {
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
    const innerClassName = bem('inner')
    const suffixIconClass = bem('suffix-icon')

    const [innerValue, updateValue] = useModelValue<string | number | undefined, typeof props>(
      props,
      emit as SetupContext['emit']
    )

    function handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      // prettier-ignore
      const newValue = props.formatterTrigger === 'onChange' && props.formatter
        ? props.formatter(value)
        : value
      updateValue(newValue)
    }

    function handleClear(event: MouseEvent) {
      updateValue('')
      emit('clear', '', event)
    }

    function handleBlur(event: Event) {
      const value = (event.target as HTMLInputElement).value
      // prettier-ignore
      const newValue = props.formatterTrigger === 'onChange' && props.formatter
        ? props.formatter(value)
        : value
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
      innerClassName,
      suffixIconClass,
      handleInput,
      handleClear,
      handleBlur,
      handleFocus,
      handleClick
    }
  }
})
</script>
