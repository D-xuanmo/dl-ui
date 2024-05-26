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
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
    />
    <close-filled v-if="showCloseIcon" :class="suffixIconClass" size="small" @click="onClear" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue'
import { createNamespace, useFormEventEmit, useModelValue } from '@xuanmo/dl-common'
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
    const isFocus = ref(false)
    const formEventEmit = useFormEventEmit(props.model!)
    const inputClassName = computed(() =>
      bem({
        border: props.border,
        focus: isFocus.value,
        [`status-${props.status}`]: props.status,
        disabled: props.disabled,
        readonly: props.readonly
      })
    )
    const innerClassName = computed(() =>
      bem('inner', {
        [`${props.inputAlign}`]: props.inputAlign
      })
    )
    const suffixIconClass = bem('suffix-icon')

    const [innerValue, updateValue] = useModelValue<string | number | undefined, typeof props>(
      props,
      emit as SetupContext['emit']
    )

    const showCloseIcon = computed(() => {
      if (props.readonly || props.disabled) return false
      return innerValue.value && props.clearable
    })

    function onInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      // prettier-ignore
      const newValue = props.formatterTrigger === 'onChange' && props.formatter
        ? props.formatter(value)
        : value
      updateValue(newValue)
    }

    function onClear(event: MouseEvent) {
      updateValue('')
      emit('clear', '', event)
      formEventEmit?.('clear', '', props.rowId)
    }

    function onBlur(event: Event) {
      isFocus.value = false
      const value = (event.target as HTMLInputElement).value
      // prettier-ignore
      const newValue = props.formatterTrigger === 'onChange' && props.formatter
        ? props.formatter(value)
        : value
      emit('blur', newValue, event)
      formEventEmit?.('blur', newValue, props.rowId)
    }

    function onFocus(event: Event) {
      if (props.border || ['warning', 'error'].includes(props.status!)) {
        isFocus.value = true
      }
      emit('focus', innerValue.value, event)
      formEventEmit?.('focus', innerValue.value, props.rowId)
    }

    function onClick(event: MouseEvent) {
      emit('click-input', innerValue.value, event)
    }

    return {
      bem,
      innerValue,
      inputClassName,
      innerClassName,
      suffixIconClass,
      showCloseIcon,
      onInput,
      onClear,
      onBlur,
      onFocus,
      onClick
    }
  }
})
</script>
