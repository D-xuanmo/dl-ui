<template>
  <li :class="itemClassName" @click="handleSelect">
    <div :class="contentClassName">
      <span :class="tipsClassName" :style="formatted.topTextStyle">
        {{ formatted.topText }}
      </span>
      <span :class="innerClassName">{{ formatted.label }}</span>
      <span :class="tipsClassName" :style="formatted.bottomTextStyle">
        {{ formatted.bottomText }}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CALENDAR_DATE_PROPS, IDay } from './props'
import { createNamespace } from '@xuanmo/dl-common'
import dateJS from '@xuanmo/datejs'

const [, bem] = createNamespace('calendar')

export default defineComponent({
  name: 'CalendarDay',
  props: CALENDAR_DATE_PROPS,
  emits: ['select'],
  setup(props, { emit }) {
    const disabled = computed(() => !props.date?.isCurrentMonth || props.date.disabled)
    const itemClassName = computed(() => {
      const today =
        dateJS(props.date!.value).format('yyyy-MM-dd') === dateJS(new Date()).format('yyyy-MM-dd')
      return bem('day', {
        disabled: disabled.value,
        today,
        selected: props.date?.type,
        [props.date?.type ?? '']: props.date?.type
      })
    })
    const contentClassName = bem('day-content')
    const innerClassName = bem('day-inner')
    const tipsClassName = bem('day-tips')

    const formatted = computed<IDay>(() => {
      return props.formatter ? props.formatter(props.date!) : props.date!
    })

    const handleSelect = () => {
      if (disabled.value) return
      emit('select', props.date?.id, props.date)
    }

    return {
      itemClassName,
      contentClassName,
      tipsClassName,
      innerClassName,
      formatted,
      handleSelect
    }
  }
})
</script>
