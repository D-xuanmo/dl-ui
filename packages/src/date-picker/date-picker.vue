<template>
  <d-cell
    :content="displayValue"
    :arrow="!readonly"
    :disabled="disabled || readonly"
    @click="showPicker"
  />
  <d-picker
    :visible="visible"
    :model-value="pickerValue"
    :options="columns"
    :title="title"
    controlled
    :disabled="disabled"
    :readonly="readonly"
    @change="handleChange"
    @confirm="handleConfirm"
    @close="hidePicker"
  />
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue'
import { createNamespace } from '../utils'
import DPicker from '../picker'
import DCell from '../cell'
import DateUtil from './date-util'
import useModelValue from '../hooks/use-model-value'
import { DATE_PICKER_PROPS, DatePickerType } from './props'
import { PickerValue } from '../picker/props'
import dateJS from '@xuanmo/datejs'
import { DateTimePickerOption } from './types'

const [name] = createNamespace('date-picker')

export default defineComponent({
  name,
  components: { DPicker, DCell },
  props: DATE_PICKER_PROPS,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useModelValue(props, emit as SetupContext['emit'])
    const dateUtil = new DateUtil(innerValue.value, {
      dateType: props.type,
      formatter: props.formatter!
    })
    const visible = ref(props.visible)
    const pickerValue = ref(dateUtil.formattedValue())
    const displayValue = ref(dateUtil.formatValue())
    const columns = ref(dateUtil.getColumns())

    const formatPickerValue = (value: PickerValue) => {
      const formatted = value.map((item) => {
        if ((item as DateTimePickerOption)?.value) return (item as DateTimePickerOption).value
        return item
      }) as string[]
      // 时间选择需要补充年月日
      if (props.type === 'time') formatted.unshift(...dateJS().format('yyyy,M,d').split(','))
      return formatted
    }

    const handleChange = (value: PickerValue, columnValue: DateTimePickerOption) => {
      const formatted = formatPickerValue(value)

      // 计算当月最后一天
      const lastDay = dateJS(new Date(+formatted[0], +formatted[1])).lastDay()

      // 日期、日期时间需要重新计算天
      if (
        (['date', 'datetime', 'date-hour'] as DatePickerType[]).includes(props.type) &&
        columnValue.type === 'month'
      ) {
        formatted.splice(2, 1, `${lastDay}`)
      }
      if (props.type === 'month-day' && columnValue.type === 'month') {
        formatted.splice(1, 1, `${lastDay}`)
      }

      dateUtil.updateDate(new Date(...(formatted as [])))
      columns.value = dateUtil.getColumns()
    }

    const handleConfirm = (value: PickerValue) => {
      const formatted = dateUtil.formatValue(new Date(...(formatPickerValue(value) as [])))
      visible.value = false
      displayValue.value = formatted
      updateValue(formatted)
    }

    const showPicker = () => {
      if (props.disabled || props.readonly) return
      visible.value = true
    }

    const hidePicker = () => {
      visible.value = false
    }

    return {
      visible,
      columns,
      pickerValue,
      displayValue,
      handleChange,
      handleConfirm,
      showPicker,
      hidePicker
    }
  }
})
</script>
