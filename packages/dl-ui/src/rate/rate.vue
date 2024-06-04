<template>
  <div :class="classes" :style="style">
    <span v-if="readonly">{{ innerValue }}</span>
    <template v-else>
      <span
        v-for="i in count"
        :key="`id.${i}`"
        :class="bem('item', { active: i <= innerValue })"
        @click="handleChange(i)"
      >
        <component
          :is="uncheckedIcon"
          :size="size!"
          :class="bem('icon', 'unchecked')"
          :color="disabled ? 'var(--d-disable-color)' : undefined"
        />
        <component
          :is="checkedIcon"
          v-if="i <= innerValue"
          :size="size!"
          :class="bem('icon', 'checked')"
          :color="disabled ? 'var(--d-disable-color)' : activeColor"
        />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, SetupContext } from 'vue'
import { addUnit, createNamespace, useModelValue } from '@xuanmo/dl-common'
import { RATE_PROPS } from './props'

const [name, bem] = createNamespace('rate')

export default defineComponent({
  name,
  props: RATE_PROPS,
  emits: ['update:model-value', 'change'],
  setup(props, context) {
    const [innerValue, updateValue] = useModelValue<number, typeof props>(
      props as never,
      context.emit as SetupContext['emit']
    )

    const classes = computed(() =>
      bem({
        readonly: props.readonly,
        disabled: props.disabled
      })
    )

    const style = computed<CSSProperties>(() => ({
      columnGap: addUnit(props.gap)
    }))

    function handleChange(index: number) {
      if (props.disabled) return
      if (props.allowClear) {
        const value = innerValue.value === index ? 0 : index
        updateValue(value)
        context.emit('change', value)
        return
      }
      updateValue(index)
      context.emit('change', index)
    }

    return {
      innerValue,
      classes,
      style,
      bem,
      handleChange
    }
  }
})
</script>
