<template>
  <d-cell-group title="基础用法">
    <d-cell title="单选">
      <d-calendar v-model="value1" placeholder="请选择" />
    </d-cell>
    <d-cell title="多选">
      <d-calendar v-model="value2" type="multiple" placeholder="请选择" />
    </d-cell>
    <d-cell title="区间选择">
      <d-calendar v-model="value3" type="range" placeholder="请选择" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="默认值">
    <d-cell title="单选">
      <d-calendar v-model="value4" :min-date="minDate" />
    </d-cell>
    <d-cell title="多选">
      <d-calendar v-model="value5" type="multiple" :min-date="minDate" />
    </d-cell>
    <d-cell title="区间选择">
      <d-calendar v-model="value6" type="range" :min-date="minDate" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="其他能力" cell-title-width="100px">
    <d-cell title="自定义文案">
      <d-calendar v-model="value6" type="range" :min-date="minDate" :formatter="formatter" />
    </d-cell>
    <d-cell title="限制最小日期">
      <d-calendar v-model="value7" :min-date="today" placeholder="请选择" />
    </d-cell>
    <d-cell title="格式化显示值">
      <d-calendar
        v-model="value8"
        :min-date="today"
        display-formatter="yyyy年MM月dd日"
        month-formatter="yyyy年MM月"
        placeholder="请选择"
      />
    </d-cell>
  </d-cell-group>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CalendarDayFormatter } from '../props'
import dateJS from '@xuanmo/datejs'

const value1 = ref()
const value2 = ref()
const value3 = ref()
const value4 = ref('2023/4/29')
const value5 = ref(['2023/4/2', '2023/4/29', '2023/4/29'])
const value6 = ref(['2023/4/15', '2023/4/18'])
const value7 = ref()
const value8 = ref()
const minDate = new Date(2023, 0, 1)
const today = new Date()

const formatter: CalendarDayFormatter = (day) => {
  Object.assign(day, {
    bottomText: '￥60'
  })
  if (day.value.getDay() === 0) {
    Object.assign(day, {
      topText: '周日',
      bottomText: day.isPrevMonth ? '' : '￥800'
    })
  }
  if (day.value.getDay() === 6) {
    Object.assign(day, {
      topText: '周六',
      bottomText: day.isPrevMonth ? '' : '￥800'
    })
  }
  if (dateJS(day.value).format('MMdd') === '0214') {
    Object.assign(day, {
      topText: '情人节',
      topTextStyle: {
        color: '#f00'
      }
    })
  }
  return day
}
</script>
