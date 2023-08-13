<template>
  <div :class="wrapperClassName">
    <template v-if="options">
      <d-checkbox
        v-for="option in options"
        :key="(option as any)[valueKey]"
        :label="(option as any)[labelKey]"
        :value="(option as any)[valueKey]"
      />
    </template>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, SetupContext, UnwrapRef } from 'vue'
import { createNamespace, useConfig, useModelValue } from '@xuanmo/dl-common'
import { CHECKBOX_GROUP_PROPS } from './props'
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
    const config = useConfig(['keys'], props)
    const wrapperClassName = bem({
      horizontal: props.direction === 'horizontal',
      vertical: props.direction === 'vertical'
    })
    const [innerValue] = useModelValue(props, emit as SetupContext['emit'])
    const disabled = computed(() => props.disabled)
    const readonly = computed(() => props.readonly)

    const valueKey = config.keys?.value || 'value'
    const labelKey = config.keys?.label || 'label'

    const updateModelValue = (value: UnwrapRef<CheckboxGroupContextType['value']>) => {
      if (value.length > props.max!) return
      emit('update:model-value', value)
    }

    provide(CHECKBOX_GROUP_CONTEXT_KEY, {
      value: innerValue,
      direction: props.direction,
      disabled,
      readonly,
      onChangeEvent: updateModelValue
    })

    return {
      wrapperClassName,
      valueKey,
      labelKey,
      updateModelValue
    }
  }
})
</script>
