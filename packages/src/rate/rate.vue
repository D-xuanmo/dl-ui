<template>
  <div :class="classes">
    <span
      v-for="i in count"
      :key="i"
      :class="bem('item', { active: i <= innerValue })"
      :style="rateItemStyle"
      @click="handleChange(i)"
    >
      <d-icon
        v-if="i > innerValue"
        :name="uncheckedIcon"
        :size="size"
        :color="disabled ? 'var(--d-disable-color)' : 'var(--d-secondary-text-color)'"
      />
      <d-icon
        v-if="i <= innerValue"
        :name="checkedIcon"
        :size="size"
        :class="bem('item', 'active', true)"
        :color="disabled ? 'var(--d-disable-color)' : activeColor"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, PropType, SetupContext } from 'vue'
import { createNamespace } from '../utils'
import { isNumber } from '@xuanmo/javascript-utils'
import useDefault from '../hooks/useDefault'
import { SizeType } from '../common'

const [name, bem] = createNamespace('rate')

const props = {
  value: {
    type: Number,
    default: undefined
  },
  modelValue: {
    type: Number,
    default: undefined
  },
  count: {
    type: Number,
    default: 5
  },
  size: {
    type: String as PropType<SizeType | string>,
    default: 'medium'
  },
  gap: {
    type: [Number, String] as PropType<number | string | undefined>,
    default: 4
  },
  checkedIcon: {
    type: String,
    default: 'star-f'
  },
  uncheckedIcon: {
    type: String,
    default: 'star'
  },
  activeColor: {
    type: String,
    default: 'rgb(250 200 0)'
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export default defineComponent({
  name,
  props,
  setup(props, context: SetupContext) {
    const [innerValue, updateValue] = useDefault<number, typeof props>(props as never, context.emit)

    const classes = bem({
      disabled: props.disabled
    })

    const rateItemStyle = computed<CSSProperties>(() => ({
      marginRight: isNumber(props.gap) ? `${props.gap}px` : props.gap
    }))

    function handleChange(index: number) {
      if (props.disabled) return
      if (props.allowClear) {
        return updateValue(innerValue.value === index ? 0 : index)
      }
      updateValue(index)
    }

    return {
      innerValue,
      classes,
      rateItemStyle,
      bem,
      handleChange
    }
  }
})
</script>
