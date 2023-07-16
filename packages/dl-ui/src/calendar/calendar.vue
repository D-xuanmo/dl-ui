<template>
  <span :class="triggerClassName" @click="handleShowPopup">
    <span>{{ displayValue || placeholder }}</span>
    <right-outlined v-if="!readonly" color="var(--d-secondary-text-color)" />
  </span>
  <d-popup
    :visible="popupVisible"
    :popup-class="wrapperClassName"
    :popup-header-class="headerClassName"
    :popup-body-class="bodyClassName"
    :title="title"
    placement="bottom"
    closable
    round
    @update:visible="handleClosePopup"
  >
    <calendar-header />
    <div ref="scrollRef" :class="scrollClassName">
      <template v-for="[key, item] in dateGroups">
        <calendar-month
          v-if="item.isMonth"
          :key="key"
          :month="item.label"
          :days="item.days"
          :intersect-count="item.intersectDayCount!"
        />
      </template>
    </div>
    <d-button
      theme="primary"
      block
      :class="confirmButtonClass"
      :disabled="!store.state.selectedComplete"
      @click="handleConfirm"
    >
      {{ confirmButtonText }}
    </d-button>
  </d-popup>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, provide, ref, SetupContext, watch } from 'vue'
import { createNamespace, useModelValue, DButton, DPopup } from '@xuanmo/dl-common'
import { CALENDAR_PROPS } from './props'
import { isEmpty } from '@xuanmo/utils'
import { generateDay } from './utils'
import dateJS from '@xuanmo/datejs'
import { RightOutlined } from '@xuanmo/dl-icons'
import CalendarHeader from './calendar-header.vue'
import CalendarMonth from './calendar-month.vue'
import { CalendarStore } from './store'
import { CALENDAR_CONTEXT_KEY } from '../context/calendar'

const [name, bem] = createNamespace('calendar')

export default defineComponent({
  name,
  components: {
    RightOutlined,
    DPopup,
    DButton,
    CalendarHeader,
    CalendarMonth
  },
  inheritAttrs: false,
  props: CALENDAR_PROPS,
  emits: ['update:model-value', 'select'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const wrapperClassName = bem({
      [props.type]: props.type
    })
    const headerClassName = bem('header')
    const bodyClassName = bem('body')
    const scrollClassName = bem('scroll')
    const contentClassName = bem('content')
    const daysClassName = bem('days')
    const confirmButtonClass = bem('confirm')
    const triggerClassName = computed(() =>
      bem('trigger', {
        empty: isEmpty(innerValue.value),
        readonly: props.readonly,
        disabled: props.disabled
      })
    )
    const scrollRef = ref()

    const store = new CalendarStore({
      minDate: props.minDate,
      maxDate: props.maxDate,
      type: props.type,
      monthFormatter: props.monthFormatter
    })

    const displayValue = ref('')

    store.setState({
      minDate: props.minDate,
      maxDate: props.maxDate
    })
    store.generateDateGroups()

    // 当前页的日期
    const currentDay = ref(new Date())

    const popupVisible = ref(false)

    const formatValue = (value: Date) => {
      return dateJS(value).format(props.valueFormatter)
    }

    const handleShowPopup = async () => {
      if (props.readonly || props.disabled) return
      if (props.modelValue) {
        currentDay.value = new Date(
          Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
        )
      }
      popupVisible.value = true
      await nextTick()
      ;(scrollRef.value as HTMLDivElement)?.scrollTo(
        0,
        (scrollRef.value?.querySelector(`.${bem('day')}--selected`) as HTMLDivElement)?.offsetTop -
          100
      )
    }

    const handleClosePopup = () => {
      popupVisible.value = false
    }

    const handleConfirm = () => {
      const days = Array.from(store.selected)
      /* eslint-disable indent */
      switch (props.type) {
        case 'single':
          updateValue(formatValue(isEmpty(days) ? currentDay.value : store.getDay(days[0]).value))
          break
        case 'multiple':
          updateValue(days.map((id) => formatValue(store.getDay(id)!.value)))
          break
        case 'range':
          updateValue([
            formatValue(store.getDay(days[0]).value),
            formatValue(store.getDay(days[1]).value)
          ])
          break
      }
      /* eslint-enable indent */
      handleClosePopup()
    }

    provide(CALENDAR_CONTEXT_KEY, { store, formatter: props.formatter })

    watch(
      () => props.modelValue,
      (modelValue) => {
        if (modelValue) {
          /* eslint-disable indent */
          switch (props.type) {
            case 'single':
              {
                const day = generateDay(new Date(modelValue as string), {
                  type: 'selected'
                })
                store.clearSelected()
                store.updateDay(day)
                store.selected.add(day.id)
                displayValue.value = dateJS(day.value).format(props.displayFormatter)
              }
              break
            case 'multiple':
              {
                displayValue.value = `已选择 ${(modelValue as []).length} 个日期`
                ;(modelValue as string[]).forEach((item) => {
                  const day = generateDay(new Date(item), {
                    type: 'selected'
                  })
                  store.updateDay(day)
                  store.selected.add(day.id)
                })
              }
              break
            case 'range':
              {
                const [start, end] = modelValue
                const startDay = generateDay(new Date(modelValue[0]))
                const endDay = generateDay(new Date(end))
                displayValue.value = `${dateJS(start).format(props.displayFormatter)} - ${dateJS(
                  end
                ).format(props.displayFormatter)}`
                store.handleSelect(startDay)
                store.handleSelect(endDay)
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
      headerClassName,
      bodyClassName,
      scrollClassName,
      confirmButtonClass,
      popupVisible,
      currentDay,
      store,
      displayValue,
      scrollRef,
      dateGroups: store.state.dateGroups,
      handleShowPopup,
      handleClosePopup,
      handleConfirm
    }
  }
})
</script>
