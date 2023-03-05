<template>
  <div :class="wrapperClassName" @click="handleChange">
    <d-icon :name="iconName" :color="iconColor" />
    <span v-if="label || $slots.default" :class="labelClassName">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { createNamespace } from '../utils'
import { isEmpty, deleteArrayItems } from '@xuanmo/javascript-utils'
import { checkboxProps } from './props'
import { CHECKBOX_GROUP_KEY } from '../context/checkbox-group'

const [name, bem] = createNamespace('checkbox')

export default defineComponent({
  name,
  props: checkboxProps,
  setup(props) {
    const { value: groupValue, disabled, onChangeEvent } = inject(CHECKBOX_GROUP_KEY)!
    const wrapperClassName = bem()
    const labelClassName = bem('label')
    const checked = computed(() => {
      // 如果 group 为空值，则默认选中当前
      return isEmpty(groupValue) ? props.defaultChecked : groupValue?.value.includes(props.value)
    })
    const iconName = computed<string>(() => (checked.value ? 'checkbox-selected-f' : 'checkbox-empty'))
    const iconColor = computed(() => {
      if (disabled.value) return 'var(--d-disable-color)'
      return checked.value ? 'var(--d-primary)' : 'var(--d-secondary-text-color)'
    })

    const handleChange = () => {
      if (disabled.value) return
      const newValue = groupValue.value.includes(props.value)
        ? deleteArrayItems([props.value], groupValue.value)
        : [...groupValue.value, props.value]
      onChangeEvent?.(newValue)
    }

    return {
      wrapperClassName,
      labelClassName,
      iconName,
      iconColor,
      handleChange
    }
  }
})
</script>
