# Calendar 日历

用于选择日期或者日期区间。

```vue client=Mobile playground=MCalendar previewType=iframe
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
const value4 = ref(new Date(2023, 4, 19))
const value5 = ref([new Date(2023, 4, 19), new Date(2023, 4, 23), new Date(2023, 4, 27)])
const value6 = ref([new Date(2023, 1, 19), new Date(2023, 4, 20), new Date(2023, 4, 21)])
const minDate = new Date(2023, 0, 1)
const today = new Date()
const value7 = ref()
const value8 = ref()

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
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`CalendarValue`|-|当前选中的数据|Y|
|type|`CalendarType`|`single`|选择类型，`single` 单选，`multiple` 多选，`range` 区间选择|N|
|min-date|`Date`|-|最小日期，默认当天|N|
|max-date|`Date`|-|最大日期，默认后 10 年|N|
|placeholder|`string`|-|提示语|N|
|title|`string`|`日期选择`|提示语|N|
|display-formatter|`string`|`yyyy/MM/dd`|显示日期格式化|N|
|value-formatter|`string`|`yyyy/MM/dd`|已选日期格式化|N|
|month-formatter|`string`|`yyyy/MM`|月份选择格式化|N|
|disabled|`boolean`|`false`|是否禁用|N|
|readonly|`boolean`|`false`|是否只读|N|
|confirm-button-text|`string`|`确认`|确认按钮文字|N|
|formatter|`CalendarDayFormatter`|-|单个日期格式|N|

## TypeScript 类型

```typescript
export type CalendarValue = string | Array<string>

/**
 * 日历选择类型
 * single：单选
 * multiple：多选
 * range：日期区间
 */
export type CalendarType = 'single' | 'multiple' | 'range'

/**
 * 单个日期格式化
 */
export type CalendarDayFormatter = (day: IDay) => IDay

import type {
  type CalendarValue,
  type CalendarProps,
  type CalendarDayFormatter,
  type IDay,
  type CalendarType
} from '@xuanmo/dl-ui'
```

## IDay 对象

公用类型 [https://github.com/D-xuanmo/dl-ui/blob/develop/packages/dl-common/src/common.ts](https://github.com/D-xuanmo/dl-ui/blob/develop/packages/dl-common/src/common.ts)

每个日期为一个对象，包含以下属性，可用于实际场景的扩展

```typescript
// 单个日期类型
export interface IDay extends IData<Date> {
  /**
   * 当前日期类型
   * selected：当前日期被选中
   * start：区间时，开始日期
   * middle：区间时，中间选择的日期
   * end：区间时，结束日期
   */
  type?: 'selected' | 'start' | 'middle' | 'end'

  // 日期唯一标识，格式为：yyyy/MM/dd
  id: string

  // 是否为当月日期
  isCurrentMonth: boolean

  // 是否为上月日期
  isPrevMonth: boolean

  // 是否为下月日期
  isNextMonth: boolean

  // 日期顶部文字
  topText?: string
  topTextStyle?: CSSProperties

  // 日期底部文字
  bottomText?: string
  bottomTextStyle?: CSSProperties
}
```
