<template>
  <div :class="wrapperClassName">
    <textarea
      ref="textareaRef"
      :value="innerValue"
      :class="innerClassName"
      :rows="rows"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :style="textareaHeight"
      @input="handleInput"
    />
    <p v-if="maxlength && showWordLimit" :class="limitClassName">{{ limit }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue'
import { createNamespace, useModelValue } from '@xuanmo/dl-common'
import { TEXTAREA_PROPS, TextareaProps } from './props'
import { useCalcTextareaHeight } from './utils'

const [name, bem] = createNamespace('textarea')

export default defineComponent({
  name,
  props: TEXTAREA_PROPS,
  emits: ['update:model-value', 'change'],
  setup(props, context) {
    const wrapperClassName = computed(() =>
      bem({
        disabled: props.disabled,
        readonly: props.readonly
      })
    )
    const innerClassName = bem('inner')
    const limitClassName = bem('limit')
    const textareaRef = ref<HTMLTextAreaElement | null>(null)

    const [innerValue, updateValue] = useModelValue<string, TextareaProps>(
      props,
      context.emit as SetupContext['emit']
    )

    const limit = computed(() => `${innerValue.value?.length || 0}/${props.maxlength}`)

    const handleInput = (event: Event) => {
      const value = (event.target as HTMLTextAreaElement).value
      updateValue(value)
      context.emit('change', value)
    }

    const textareaHeight = useCalcTextareaHeight(innerValue, textareaRef, {
      autosize: props.autosize
    })

    return {
      wrapperClassName,
      innerClassName,
      limitClassName,
      innerValue,
      limit,
      textareaHeight,
      textareaRef,
      handleInput
    }
  }
})
</script>
