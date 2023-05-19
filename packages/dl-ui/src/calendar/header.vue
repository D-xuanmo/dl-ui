<template>
  <header :class="headerClassName">
    <d-space :gap="10">
      <d-icon name="double-arrow-left" size="large" @click="togglePrevYear" />
      <d-icon name="arrow-left" size="large" @click="togglePrevMonth" />
    </d-space>
    <span :class="dateClassName">
      <d-date-time-picker
        :model-value="datePickerValue"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :display-formatter="monthFormatter"
        @update:model-value="toggleMonth"
      >
        <template #trigger-arrow>
          <d-icon name="arrow-bottom-f" size="small" color="var(--d-secondary-text-color)" />
        </template>
      </d-date-time-picker>
    </span>
    <d-space :gap="10">
      <d-icon name="arrow-right" size="large" @click="toggleNextMonth" />
      <d-icon name="double-arrow-right" size="large" @click="toggleNextYear" />
    </d-space>
  </header>
  <ul :class="weekClassName">
    <li v-for="item in weekList" :key="item.id">{{ item.text }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { CALENDAR_HEADER_PROPS } from './props'
import useModelValue from '../hooks/use-model-value'
import DDateTimePicker from '../date-time-picker'
import DIcon from '../icon'
import DSpace from '../space'
import dateJS from '@xuanmo/datejs'

const [, bem] = createNamespace('calendar')

export default defineComponent({
  name: 'CalendarHeader',
  components: {
    DDateTimePicker,
    DIcon,
    DSpace
  },
  props: CALENDAR_HEADER_PROPS,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const headerClassName = bem('header')
    const dateClassName = bem('header-date')
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

    const datePickerValue = computed(() => {
      return dateJS(props.modelValue).format('yyyy/MM')
    })

    const togglePrevMonth = () => {
      const year = innerValue.value.getFullYear()
      const month = innerValue.value.getMonth() - 1
      if (props.minDate.getFullYear() === year && month < props.minDate.getMonth()) return
      updateValue(new Date(year, month))
    }

    const togglePrevYear = () => {
      const year = innerValue.value.getFullYear() - 1
      if (year < props.minDate.getFullYear()) return
      updateValue(new Date(year, innerValue.value.getMonth()))
    }

    const toggleNextMonth = () => {
      const year = innerValue.value.getFullYear()
      const month = innerValue.value.getMonth() + 1
      if (year === props.maxDate.getFullYear() && month > props.maxDate.getMonth()) return
      updateValue(new Date(year, month))
    }

    const toggleNextYear = () => {
      const year = innerValue.value.getFullYear() + 1
      if (year > props.maxDate.getFullYear()) return
      updateValue(new Date(year, innerValue.value.getMonth()))
    }

    const toggleMonth = (value: string) => {
      const year = +dateJS(new Date(`${value}/1`)).format('yyyy')
      const month = +dateJS(new Date(`${value}/1`)).format('M') - 1
      updateValue(new Date(year, month))
    }

    return {
      headerClassName,
      weekClassName,
      weekList,
      dateClassName,
      innerValue,
      datePickerValue,
      togglePrevMonth,
      togglePrevYear,
      toggleNextMonth,
      toggleNextYear,
      toggleMonth
    }
  }
})
</script>
