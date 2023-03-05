<template>
  <div :class="wrapperClassName">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, SetupContext, UnwrapRef } from 'vue'
import { createNamespace } from '../utils/bem'
import { checkboxGroupProps } from './props'
import useDefault from '../hooks/useDefault'
import { CHECKBOX_GROUP_KEY, CheckboxGroupContextType } from '../context/checkbox-group'

const [name, bem] = createNamespace('checkbox-group')

export default defineComponent({
  name,
  props: checkboxGroupProps,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const wrapperClassName = bem({
      horizontal: props.direction === 'horizontal',
      vertical: props.direction === 'vertical'
    })
    const [innerValue] = useDefault(props, emit as SetupContext['emit'])
    const disabled = computed(() => props.disabled)

    const updateModelValue = (value: UnwrapRef<CheckboxGroupContextType['value']>) => {
      if (value.length > props.max!) return
      emit('update:model-value', value)
    }

    provide(CHECKBOX_GROUP_KEY, {
      value: innerValue,
      direction: props.direction,
      disabled,
      onChangeEvent: updateModelValue
    })

    return {
      wrapperClassName,
      updateModelValue
    }
  }
})
</script>
