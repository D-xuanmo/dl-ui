<template>
  <div :class="wrapperClassName">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, SetupContext } from 'vue'
import { createNamespace } from '../utils/bem'
import { radioGroupProps } from './props'
import useDefault from '../hooks/useDefault'
import { RADIO_GROUP_KEY } from '../context'

const [name, bem] = createNamespace('radio-group')

export default defineComponent({
  name,
  props: radioGroupProps,
  emits: ['update:model-value', 'change'],
  setup(props, { emit }) {
    const wrapperClassName = bem({
      horizontal: props.direction === 'horizontal',
      vertical: props.direction === 'vertical'
    })
    const [innerValue] = useDefault(props, emit as SetupContext['emit'])
    const disabled = computed(() => props.disabled)

    const updateModelValue = (value: any) => {
      emit('update:model-value', value)
      emit('change', value)
    }

    provide(RADIO_GROUP_KEY, {
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
