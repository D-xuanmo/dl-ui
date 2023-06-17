<template>
  <div :class="wrapperClassName">
    <h2 :class="titleClassName">{{ month }}</h2>
    <ul :class="daysClassName">
      <li v-for="item in intersectCount" :key="`${month}@${item}`" :class="dayClassName" />
      <calendar-day v-for="id in days" :key="id" :day="store.getDay(id)!" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import CalendarDay from './calendar-day.vue'
import { CALENDAR_CONTEXT_KEY } from '../context/calendar'

const [, bem] = createNamespace('calendar')

export default defineComponent({
  name: 'CalendarMonth',
  components: {
    CalendarDay
  },
  props: {
    month: {
      type: String,
      required: true
    },
    days: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    intersectCount: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { store } = inject(CALENDAR_CONTEXT_KEY)!
    const wrapperClassName = bem('month-group')
    const titleClassName = bem('month-title')
    const daysClassName = bem('days')
    const dayClassName = bem('day', ['placeholder'])

    return {
      wrapperClassName,
      titleClassName,
      daysClassName,
      dayClassName,
      store
    }
  }
})
</script>
