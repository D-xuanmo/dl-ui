<template>
  <div :class="wrapperClassName">
    <template v-if="options">
      <d-checkbox
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </template>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, SetupContext, UnwrapRef } from 'vue'
import { createNamespace } from '../utils'
import { CHECKBOX_GROUP_PROPS } from './props'
import useDefault from '../hooks/useDefault'
import { CHECKBOX_GROUP_CONTEXT_KEY, CheckboxGroupContextType } from '../context'
import DCheckbox from '../checkbox'

const [name, bem] = createNamespace('checkbox-group')

export default defineComponent({
  name,
  components: {
    DCheckbox
  },
  props: CHECKBOX_GROUP_PROPS,
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

    provide(CHECKBOX_GROUP_CONTEXT_KEY, {
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
