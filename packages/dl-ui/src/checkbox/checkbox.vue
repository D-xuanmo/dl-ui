<template>
  <div :class="wrapperClassName" @click="handleChange">
    <check-square-filled v-if="checked" :color="iconColor" />
    <border-square-outlined v-else :color="iconColor" />
    <span v-if="label || $slots.default" :class="labelClassName">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { isEmpty, deleteArrayItems } from '@xuanmo/utils'
import { CHECKBOX_PROPS } from './props'
import { CHECKBOX_GROUP_CONTEXT_KEY } from '../context'
import { CheckSquareFilled, BorderSquareOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('checkbox')

export default defineComponent({
  name,
  components: {
    CheckSquareFilled,
    BorderSquareOutlined
  },
  props: CHECKBOX_PROPS,
  setup(props) {
    const {
      value: groupValue,
      disabled,
      readonly,
      onChangeEvent
    } = inject(CHECKBOX_GROUP_CONTEXT_KEY)!
    const wrapperClassName = computed(() =>
      bem({
        disabled: disabled.value,
        readonly: readonly.value
      })
    )
    const labelClassName = bem('label')
    const checked = computed(() => {
      // 如果 group 为空值，则默认选中当前
      return isEmpty(groupValue) ? props.defaultChecked : groupValue?.value.includes(props.value)
    })
    const iconColor = computed(() => {
      if (disabled.value || readonly.value) return 'var(--d-disable-color)'
      return checked.value ? 'var(--d-primary)' : 'var(--d-secondary-text-color)'
    })

    const handleChange = () => {
      if (disabled.value || readonly.value) return
      const newValue = groupValue.value.includes(props.value)
        ? deleteArrayItems([props.value], groupValue.value)
        : [...groupValue.value, props.value]
      onChangeEvent?.(newValue)
    }

    return {
      wrapperClassName,
      labelClassName,
      iconColor,
      checked,
      handleChange
    }
  }
})
</script>
