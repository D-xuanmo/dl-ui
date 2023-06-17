<template>
  <li :class="itemClassName" @click="handleSelect">
    <span :class="tipsClassName" :style="formatted.topTextStyle">
      {{ formatted.topText }}
    </span>
    <span :class="innerClassName">{{ formatted.label }}</span>
    <span :class="tipsClassName" :style="formatted.bottomTextStyle">
      {{ formatted.bottomText }}
    </span>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import dateJS from '@xuanmo/datejs'
import { IDay } from './types'
import { CALENDAR_CONTEXT_KEY } from '../context/calendar'

const [, bem] = createNamespace('calendar')

export default defineComponent({
  name: 'CalendarDay',
  props: {
    day: {
      type: Object as PropType<IDay>,
      required: true
    }
  },
  emits: ['select'],
  setup(props) {
    const { store, formatter } = inject(CALENDAR_CONTEXT_KEY)!
    const disabled = computed(() => props.day.disabled)
    const itemClassName = computed(() => {
      const today =
        dateJS(props.day!.value).format('yyyy-MM-dd') === dateJS(new Date()).format('yyyy-MM-dd')
      return bem('day', {
        today,
        disabled: disabled.value,
        selected: props.day?.type,
        [props.day.type as string]: props.day?.type
      })
    })
    const innerClassName = bem('day-inner')
    const tipsClassName = bem('day-tips')

    const formatted = computed<IDay>(() => {
      return formatter ? formatter(props.day!) : props.day!
    })

    const handleSelect = () => {
      if (disabled.value) return
      store.handleSelect(props.day)
    }

    return {
      itemClassName,
      tipsClassName,
      innerClassName,
      formatted,
      handleSelect
    }
  }
})
</script>
