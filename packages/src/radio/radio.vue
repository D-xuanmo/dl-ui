<template>
  <div :class="wrapperClassName" @click="handleChange">
    <d-icon :name="iconName" :color="iconColor" />
    <span v-if="label" :class="labelClassName">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { createNamespace } from '../utils'
import { RADIO_PROPS } from './props'
import { isEmpty } from '@xuanmo/javascript-utils'
import { RADIO_GROUP_CONTEXT_KEY } from '../context'

const [name, bem] = createNamespace('radio')
export default defineComponent({
  name,
  props: RADIO_PROPS,
  setup(props) {
    const { value, disabled, readonly, onChangeEvent } = inject(RADIO_GROUP_CONTEXT_KEY)!

    const wrapperClassName = computed(() =>
      bem({
        disabled: disabled.value || readonly.value
      })
    )

    const labelClassName = bem('label')

    const checked = computed(() => {
      // 如果 group 为空值，则默认选中当前
      return isEmpty(value?.value) ? props.defaultChecked : value?.value === props.value
    })

    const iconName = computed<string>(() => (checked.value ? 'success-f' : 'circle'))
    const iconColor = computed(() => {
      if (disabled.value || readonly.value) return 'var(--d-disable-color)'
      return checked.value ? 'var(--d-primary)' : 'var(--d-secondary-text-color)'
    })

    const handleChange = () => {
      if (disabled.value || readonly.value) return
      onChangeEvent?.(props.value)
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
