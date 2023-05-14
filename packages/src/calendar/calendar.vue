<template>
  <span :class="triggerClassName" @click="handleShowPopup">
    <span>{{ displayValue || placeholder }}</span>
    <d-icon v-if="!readonly" name="arrow-right" color="var(--d-secondary-text-color)" />
  </span>
  <d-popup
    :visible="popupVisible"
    :popup-class="wrapperClassName"
    :popup-body-class="bodyClassName"
    :title="title"
    placement="bottom"
    closeable
    @update:visible="handleClosePopup"
  >
    <calendar-header
      v-model="currentDay"
      :min-date="minDate"
      :max-date="maxDate"
      :month-formatter="monthFormatter"
    />
    <ul :class="daysClassName">
      <calendar-day
        v-for="item in currentDays"
        :key="item.id"
        :date="item"
        :formatter="formatter"
        @select="handleSelect"
      />
    </ul>
    <d-button theme="primary" size="large" block :disabled="!isSelected" @click="handleConfirm">
      {{ confirmButtonText }}
    </d-button>
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import { createNamespace } from '../utils'
import { CALENDAR_PROPS, IDay } from './props'
import useModelValue from '../hooks/use-model-value'
import { isEmpty, pickLastItem } from '@xuanmo/javascript-utils'
import DIcon from '../icon'
import DPopup from '../popup'
import CalendarHeader from './header.vue'
import CalendarDay from './day.vue'
import DButton from '../button'
import { generateDay, useCurrentDays } from './utils'
import dateJS from '@xuanmo/datejs'

const [name, bem] = createNamespace('calendar')

export default defineComponent({
  name,
  components: {
    DIcon,
    DPopup,
    DButton,
    CalendarHeader,
    CalendarDay
  },
  props: CALENDAR_PROPS,
  emits: ['update:model-value', 'select'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const wrapperClassName = bem({
      [props.type]: props.type
    })
    const bodyClassName = bem('body')
    const contentClassName = bem('content')
    const daysClassName = bem('days')
    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: isEmpty(innerValue.value)
      })
    )

    const displayValue = ref('')
    const startDay = ref<IDay | null>(null)
    const endDay = ref<IDay | null>(null)

    // 所有已经选择的日期
    const selectedMap = ref<Map<string, IDay | null>>(new Map())

    // 当前页的日期
    const currentDay = ref(new Date())

    // 当前页的日期列表
    const currentDays = useCurrentDays(currentDay, selectedMap, {
      startDay: startDay,
      endDay: endDay,
      disabledMinDay: props.minDate,
      disabledMaxDay: props.maxDate
    })

    // 区间选择相关记录
    const isSelected = ref(props.type !== 'range')

    const popupVisible = ref(false)

    const handleShowPopup = () => {
      if (props.modelValue) {
        currentDay.value = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
      }
      popupVisible.value = true
    }

    const handleClosePopup = () => {
      popupVisible.value = false
    }

    const handleSelect = (id: string, day: IDay) => {
      if (selectedMap.value.get(id)) {
        selectedMap.value.set(id, null)
      } else {
        /* eslint-disable indent */
        switch (props.type) {
          case 'single':
            selectedMap.value.clear()
            selectedMap.value.set(id, { ...day, type: 'selected' })
            break
          case 'multiple':
            selectedMap.value.set(id, { ...day, type: 'selected' })
            break
          case 'range':
            {
              if (isSelected.value) {
                startDay.value = null
                endDay.value = null
                selectedMap.value.clear()
                isSelected.value = false
              }
              const allSelectedDate = Array.from(selectedMap.value.values())
                .filter(Boolean)
                .map((item) => +item!.value)
              const min = Math.min(...allSelectedDate)
              const max = Math.min(...allSelectedDate)
              if (+day.value <= min) {
                selectedMap.value.clear()
                startDay.value = day
              }
              if (+day.value >= max) {
                endDay.value = day
                isSelected.value = true
              }
              selectedMap.value.set(id, { ...day, type: 'selected' })
            }
            break
        }
        /* eslint-enable indent */
      }
      emit('select', day)
    }

    const handleConfirm = () => {
      const days = Array.from(selectedMap.value.values())
      /* eslint-disable indent */
      switch (props.type) {
        case 'single':
          updateValue(isEmpty(days) ? currentDay.value : days[0]!.value)
          break
        case 'multiple':
          updateValue(days.map((item) => item!.value))
          break
        case 'range':
          updateValue([startDay.value!.value, endDay.value!.value])
          break
      }
      /* eslint-enable indent */
      handleClosePopup()
    }

    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          /* eslint-disable indent */
          switch (props.type) {
            case 'single':
              {
                const day = generateDay(value as Date)
                selectedMap.value.set(day.id, {
                  ...day,
                  type: 'selected'
                })
                displayValue.value = dateJS(value as Date).format(props.displayFormatter)
              }
              break
            case 'multiple':
              {
                displayValue.value = `已选择 ${(value as []).length} 个日期`
                ;(value as Date[]).forEach((item) => {
                  const day = generateDay(item as Date)
                  selectedMap.value.set(day.id, {
                    ...day,
                    type: 'selected'
                  })
                })
              }
              break
            case 'range':
              {
                const start = (value as Date[])[0]
                const end = pickLastItem(value as Date[])
                const localStartDay = generateDay(start)
                const localEndDay = generateDay(end)
                displayValue.value = `${dateJS(start).format(props.displayFormatter)} - ${dateJS(
                  end
                ).format(props.displayFormatter)}`
                startDay.value = localStartDay
                endDay.value = localEndDay
                isSelected.value = (start && end) as unknown as boolean
              }
              break
          }
          /* eslint-enable indent */
        }
      },
      {
        immediate: true
      }
    )

    return {
      wrapperClassName,
      triggerClassName,
      daysClassName,
      contentClassName,
      bodyClassName,
      popupVisible,
      currentDays,
      currentDay,
      isSelected,
      displayValue,
      handleShowPopup,
      handleClosePopup,
      handleSelect,
      handleConfirm
    }
  }
})
</script>
