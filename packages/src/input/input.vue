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
    :right-icon="innerValue && clearable ? 'close-f' : undefined"
    right-icon-color="var(--d-secondary-text-color)"
    :right-icon-props="{ onClick: handleClear }"
  >
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
  </Cell>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from 'vue'
import { createNamespace } from '../utils/bem'
import Cell from '../cell'
import { FieldFormatterTrigger, HorizontalAlignEnum, SizeEnum } from '../common'
import useDefault from '../hooks/useDefault'

const [name, bem] = createNamespace('input')

export default defineComponent({
  name,
  components: {
    Cell
  },
  props: {
    value: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined
    },
    modelValue: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined
    },

    type: {
      type: String as PropType<'text' | 'number' | 'password' | 'email' | 'url'>,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },

    // label 相关参数
    label: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    },
    labelAlign: {
      type: String as PropType<HorizontalAlignEnum>,
      default: 'left'
    },
    hideLabel: Boolean,
    leftIcon: {
      type: String,
      default: ''
    },
    leftIconSize: {
      type: String as PropType<SizeEnum | string>,
      default: 'medium'
    },
    leftIconColor: {
      type: String,
      default: ''
    },
    colon: Boolean,
    required: Boolean,

    // 内容相关参数
    placeholder: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    inputAlign: {
      type: String as PropType<HorizontalAlignEnum>,
      default: 'left'
    },
    maxlength: {
      type: Number,
      default: -1
    },
    suffix: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    clearable: Boolean,

    formatter: {
      type: Function as PropType<(value: string | number | undefined) => string>,
      default: null
    },
    formatterTrigger: {
      type: String as PropType<FieldFormatterTrigger | undefined>,
      default: 'onChange'
    }
  },
  emits: ['update:model-value', 'blur', 'clear', 'focus', 'click-input'],
  setup(props, { emit }) {
    const inputClassName = computed(() =>
      bem({
        disabled: props.disabled,
        readonly: props.readonly,
        right: props.suffix,
        [`${props.inputAlign}`]: props.inputAlign
      })
    )

    const [innerValue, setValue] = useDefault<string | number | undefined, typeof props>(
      props,
      emit as SetupContext['emit']
    )

    function handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      const newValue = props.formatterTrigger === 'onChange' && props.formatter ? props.formatter(value) : value
      setValue(newValue)
    }

    function handleClear(event: MouseEvent) {
      emit('update:model-value', '')
      emit('clear', '', event)
    }

    function handleBlur(event: Event) {
      const value = innerValue.value
      const newValue = props.formatterTrigger === 'onChange' && props.formatter ? props.formatter(value) : value
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
