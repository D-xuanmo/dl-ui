<template>
  <div :class="classes">
    <span v-if="readonly">{{ innerValue }}</span>
    <template v-else>
      <span
        v-for="i in count"
        :key="i"
        :class="bem('item', { active: i <= innerValue })"
        :style="rateItemStyle"
        @click="handleChange(i)"
      >
        <star-outlined
          v-if="i > innerValue"
          :size="size!"
          :color="disabled ? 'var(--d-disable-color)' : 'var(--d-secondary-text-color)'"
        />
        <star-filled
          v-if="i <= innerValue"
          :size="size!"
          :class="bem('item', 'active', true)"
          :color="disabled ? 'var(--d-disable-color)' : activeColor"
        />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, SetupContext } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { isNumber } from '@xuanmo/javascript-utils'
import useModelValue from '../hooks/use-model-value'
import { RATE_PROPS } from './props'
import { StarFilled, StarOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('rate')

export default defineComponent({
  name,
  components: {
    StarFilled,
    StarOutlined
  },
  props: RATE_PROPS,
  setup(props, context: SetupContext) {
    const [innerValue, updateValue] = useModelValue<number, typeof props>(
      props as never,
      context.emit
    )

    const classes = bem({
      readonly: props.readonly,
      disabled: props.disabled
    })

    const rateItemStyle = computed<CSSProperties>(() => ({
      marginRight: isNumber(props.gap) ? `${props.gap}px` : props.gap
    }))

    function handleChange(index: number) {
      if (props.disabled) return
      if (props.allowClear) {
        return updateValue(innerValue.value === index ? 0 : index)
      }
      updateValue(index)
    }

    return {
      innerValue,
      classes,
      rateItemStyle,
      bem,
      handleChange
    }
  }
})
</script>
