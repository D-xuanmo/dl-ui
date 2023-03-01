<template>
  <d-cell :content="displayValue" @click="showPicker = true" />
  <d-picker
    :visible="showPicker"
    :value="pickerValue"
    :columns="columns"
    :title="title"
    @change="handleChange"
    @confirm="handleConfirm"
    @close="showPicker = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue'
import { createNamespace } from '../utils/bem'
import DPicker from '../picker'
import DCell from '../cell'
import DateUtil from './date-util'
import useDefault from '../hooks/useDefault'
import { datePickerProps, DatePickerType } from './props'
import { PickerValueType } from '../picker/props'
import dateJS from '@xuanmo/datejs'
import { DateTimePickerColumnType } from './types'

const [name] = createNamespace('date-picker')

export default defineComponent({
  name,
  components: { DPicker, DCell },
  props: datePickerProps,
  emits: ['update:value', 'update:modelValue'],
  setup(props, { emit }) {
    const [innerValue, updateValue] = useDefault(props, emit as SetupContext['emit'])
    const dateUtil = new DateUtil(innerValue.value, {
      dateType: props.type,
      formatter: props.formatter!
    })
    const showPicker = ref(props.visible)
    const pickerValue = ref(dateUtil.formattedValue())
    const displayValue = ref(dateUtil.formatValue())
    const columns = ref(dateUtil.getColumns())

    const formatPickerValue = (value: PickerValueType) => {
      const formatted = value.map((item) => {
        if ((item as DateTimePickerColumnType)?.value) return (item as DateTimePickerColumnType).value
        return item
      }) as string[]
      // 时间选择需要补充年月日
      if (props.type === 'time') formatted.unshift(...dateJS().format('yyyy,M,d').split(','))
      return formatted
    }

    const handleChange = (value: PickerValueType, columnValue: DateTimePickerColumnType) => {
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

    const handleConfirm = (value: PickerValueType) => {
      const formatted = dateUtil.formatValue(new Date(...(formatPickerValue(value) as [])))
      showPicker.value = false
      displayValue.value = formatted
      updateValue(formatted)
    }

    return {
      showPicker,
      columns,
      pickerValue,
      displayValue,
      handleChange,
      handleConfirm
    }
  }
})
</script>
