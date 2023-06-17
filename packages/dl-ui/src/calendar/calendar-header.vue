<template>
  <ul :class="weekClassName">
    <li v-for="item in weekList" :key="item.id">{{ item.text }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace, pickProps } from '@xuanmo/dl-common'
import { CALENDAR_PROPS } from './props'

const [, bem] = createNamespace('calendar')

export default defineComponent({
  name: 'CalendarHeader',
  props: {
    ...pickProps(CALENDAR_PROPS, ['minDate', 'maxDate', 'monthFormatter']),
    modelValue: {
      type: Date,
      default: undefined
    }
  },
  setup() {
    const weekClassName = bem('week')
    const weeks: Record<string, string> = {
      0: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六'
    }
    const weekList = Object.keys(weeks).map((item) => ({
      id: `${item}`,
      text: weeks[item]
    }))

    return {
      weekClassName,
      weekList
    }
  }
})
</script>
