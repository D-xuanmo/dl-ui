<template>
  <div :class="wrapperClassName">
    <template v-if="options">
      <d-radio
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
import { computed, defineComponent, provide, SetupContext } from 'vue'
import { createNamespace } from '../utils'
import { RADIO_GROUP_PROPS } from './props'
import useDefault from '../hooks/useDefault'
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

    provide(RADIO_GROUP_CONTEXT_KEY, {
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
