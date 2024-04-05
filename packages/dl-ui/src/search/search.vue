<template>
  <div :class="wrapperClassName">
    <div :class="bodyClassName">
      <search-outlined size="small" color="var(--d-secondary-text-color)" />
      <d-input
        :model-value="innerValue"
        :name="name"
        :class="inputClassName"
        :placeholder="placeholder"
        :clearable="clearable"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :input-align="inputAlign"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        :formatter="formatter"
        :formatter-trigger="formatterTrigger"
        @update:model-value="onInternalChange"
        @clear="onClear"
        @blur="onBlur"
        @focus="onFocus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import { createNamespace, useModelValue } from '@xuanmo/dl-common'
import { SearchOutlined } from '@xuanmo/dl-icons'
import DInput from '../input'
import { SEARCH_PROPS } from './props'

const [name, bem] = createNamespace('search')

export default defineComponent({
  name,
  components: { DInput, SearchOutlined },
  props: SEARCH_PROPS,
  emits: ['update:model-value', 'clear', 'focus', 'blur'],
  setup(props, ctx) {
    const wrapperClassName = bem()
    const bodyClassName = computed(() =>
      bem('body', {
        round: props.round
      })
    )
    const inputClassName = bem('input')
    const [innerValue, setInnerValue] = useModelValue(props, ctx.emit as SetupContext['emit'])

    const onInternalChange = (value: string) => {
      setInnerValue(value)
    }

    const onClear = (value: string, event: MouseEvent) => {
      ctx.emit('clear', value, event)
    }

    const onBlur = (value: string, event: MouseEvent) => {
      ctx.emit('blur', value, event)
    }

    const onFocus = (value: string, event: MouseEvent) => {
      ctx.emit('focus', value, event)
    }

    return {
      wrapperClassName,
      bodyClassName,
      inputClassName,
      innerValue,
      onInternalChange,
      onClear,
      onBlur,
      onFocus
    }
  }
})
</script>
