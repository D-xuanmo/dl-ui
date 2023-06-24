<template>
  <span :class="triggerClassName" @click="showPicker">
    <span>{{ displayValue }}</span>
    <slot v-if="!readonly" name="trigger-arrow">
      <right-outlined color="var(--d-secondary-text-color)" />
    </slot>
  </span>
  <d-picker
    :visible="visible"
    :model-value="pickerValue"
    :options="columns"
    :title="title"
    controlled
    :disabled="disabled"
    :readonly="readonly"
    @change="(handleChange as any)"
    @confirm="handleConfirm"
    @close="hidePicker"
  />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, SetupContext, watch } from 'vue'
import { createNamespace, useModelValue } from '@xuanmo/dl-common'
import DPicker from '../picker'
import DateUtil from './date-util'
import { DATE_PICKER_PROPS, DateTimePickerType } from './props'
import { PickerValue } from '../picker/props'
import dateJS from '@xuanmo/datejs'
import { DateTimePickerOption } from './types'
import { RightOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('date-time-picker')

export default defineComponent({
  name,
  components: { DPicker, RightOutlined },
  props: DATE_PICKER_PROPS,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const dateUtil = new DateUtil(innerValue.value, {
      dateType: props.type,
      formatter: props.formatter!,
      minDate: props.minDate,
      maxDate: props.maxDate
    })
    const visible = ref(props.visible)
    const pickerValue = ref(dateUtil.pickerValue)
    const displayValue = ref(dateUtil.value)
    const columns = ref(dateUtil.getColumns())

    const triggerClassName = computed(() =>
      bem('trigger', {
        readonly: props.readonly,
        disabled: props.disabled
      })
    )

    const handleChange = (value: PickerValue, columnValue: DateTimePickerOption) => {
      const formatted = value.map((item) => {
        if ((item as DateTimePickerOption)?.value) {
          return (item as DateTimePickerOption).value
        }
        return item
      }) as string[]

      // 日期、日期时间需要重新计算天
      if (['year', 'month'].includes(columnValue.type)) {
        const types: DateTimePickerType[] = ['date', 'datetime', 'date-hour']
        if (types.includes(props.type)) {
          const [year, month] = formatted
          const lastDay = dateJS(new Date(+year, +month)).lastDay()
          formatted.splice(2, 1, `${lastDay}`)
        }
        if (props.type === 'month-day') {
          const year = new Date().getFullYear()
          const [month] = formatted
          const lastDay = dateJS(new Date(year, +month)).lastDay()
          formatted.splice(1, 1, `${lastDay}`)
        }
      }
      dateUtil.update(formatted)
      columns.value = dateUtil.getColumns()
    }

    const handleConfirm = () => {
      visible.value = false
      pickerValue.value = dateUtil.pickerValue
      updateValue(dateUtil.value)
    }

    const showPicker = () => {
      if (props.disabled || props.readonly) return
      visible.value = true
    }

    const hidePicker = () => {
      visible.value = false
    }

    watch(
      () => props.modelValue,
      async (modelValue) => {
        await nextTick()
        if (modelValue) {
          dateUtil.update(modelValue)
          pickerValue.value = dateUtil.pickerValue
          displayValue.value = props.displayFormatter
            ? dateJS(dateUtil.convertDate(modelValue)).format(props.displayFormatter)
            : dateUtil.value
        }
      },
      {
        immediate: true
      }
    )

    return {
      visible,
      columns,
      pickerValue,
      displayValue,
      triggerClassName,
      handleChange,
      handleConfirm,
      showPicker,
      hidePicker
    }
  }
})
</script>
