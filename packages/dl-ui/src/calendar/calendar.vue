<template>
  <span :class="triggerClassName" @click="handleShowPopup">
    <span>{{ displayValue || placeholder }}</span>
    <RightOutlined v-if="!readonly" color="var(--d-secondary-text-color)" />
  </span>
  <DPopup
    :visible="popupVisible"
    :popup-class="wrapperClassName"
    :popup-body-class="bodyClassName"
    :title="title"
    placement="bottom"
    closeable
    @update:visible="handleClosePopup"
  >
    <CalendarHeader
      v-model="currentDay"
      :min-date="minDate"
      :max-date="maxDate"
      :month-formatter="monthFormatter"
    />
    <ul :class="daysClassName">
      <CalendarDay
        v-for="item in currentDays"
        :key="item.id"
        :date="item"
        :formatter="formatter"
        @select="handleSelect"
      />
    </ul>
    <DButton theme="primary" size="large" block :disabled="!isSelected" @click="handleConfirm">
      {{ confirmButtonText }}
    </DButton>
  </DPopup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
import { CALENDAR_PROPS, IDay } from './props'
import useModelValue from '../hooks/use-model-value'
import { isEmpty, pickLastItem } from '@xuanmo/javascript-utils'
import DPopup from '../popup'
import CalendarHeader from './header.vue'
import CalendarDay from './day.vue'
import DButton from '../button'
import { generateDay, useCurrentDays } from './utils'
import dateJS from '@xuanmo/datejs'
import { RightOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('calendar')

export default defineComponent({
  name,
  components: {
    RightOutlined,
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
        empty: isEmpty(innerValue.value),
        readonly: props.readonly,
        disabled: props.disabled
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

    const formatValue = (value: Date) => {
      return dateJS(value).format(props.valueFormatter)
    }

    const handleShowPopup = () => {
      if (props.readonly || props.disabled) return
      if (props.modelValue) {
        currentDay.value = new Date(
          Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
        )
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
          updateValue(formatValue(isEmpty(days) ? currentDay.value : days[0]!.value))
          break
        case 'multiple':
          updateValue(days.map((item) => formatValue(item!.value)))
          break
        case 'range':
          updateValue([formatValue(startDay.value!.value), formatValue(endDay.value!.value)])
          break
      }
      /* eslint-enable indent */
      handleClosePopup()
    }

    watch(
      () => props.modelValue,
      (modelValue) => {
        if (modelValue) {
          /* eslint-disable indent */
          switch (props.type) {
            case 'single':
              {
                const day = generateDay(new Date(modelValue as string))
                selectedMap.value.set(day.id, {
                  ...day,
                  type: 'selected'
                })
                displayValue.value = dateJS(day.value).format(props.displayFormatter)
              }
              break
            case 'multiple':
              {
                displayValue.value = `已选择 ${(modelValue as []).length} 个日期`
                ;(modelValue as string[]).forEach((item) => {
                  const day = generateDay(new Date(item))
                  selectedMap.value.set(day.id, {
                    ...day,
                    type: 'selected'
                  })
                })
              }
              break
            case 'range':
              {
                const start = new Date(modelValue[0])
                const end = new Date(pickLastItem(modelValue as string[]))
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
