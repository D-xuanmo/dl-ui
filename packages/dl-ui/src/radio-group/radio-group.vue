<template>
  <div :class="wrapperClassName">
    <template v-if="!readonly">
      <template v-if="options">
        <d-radio
          v-for="option in options"
          :key="(option as any)[valueKey]"
          :label="(option as any)[labelKey]"
          :value="(option as any)[valueKey]"
        />
      </template>
      <slot v-else />
    </template>
    <template v-else>{{ displayName }}</template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, SetupContext } from 'vue'
import { createNamespace, useConfig, useModelValue } from '@xuanmo/dl-common'
import { RADIO_GROUP_PROPS } from './props'
import { RADIO_GROUP_CONTEXT_KEY } from '../context'
import DRadio from '../radio'

const [name, bem] = createNamespace('radio-group')

export default defineComponent({
  name,
  components: {
    DRadio
  },
  props: RADIO_GROUP_PROPS,
  emits: ['update:model-value', 'change'],
  setup(props, { emit }) {
    const config = useConfig(['keys'], props)
    const valueKey = config.value.keys?.value || 'value'
    const labelKey = config.value.keys?.label || 'label'
    const wrapperClassName = bem({
      horizontal: props.direction === 'horizontal',
      vertical: props.direction === 'vertical'
    })
    const [innerValue] = useModelValue(props, emit as SetupContext['emit'])
    const disabled = computed(() => props.disabled)
    const readonly = computed(() => props.readonly)
    const displayName = computed<string>(() => {
      if (!readonly.value) return ''
      return (
        props.options?.find((item) => item[valueKey as 'value'] === innerValue.value)?.[
          labelKey as 'label'
        ] ?? ''
      )
    })

    const updateModelValue = (value: any) => {
      emit('update:model-value', value)
      emit('change', value)
    }

    provide(RADIO_GROUP_CONTEXT_KEY, {
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
      readonly,
      displayName,
      updateModelValue
    }
  }
})
</script>
