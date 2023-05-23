# DateTimePicker 日期时间选择器

用于选择日期、时间。

```vue client=Mobile playground=MDateTimePicker previewType=iframe
<template>
  <d-cell title="日期时间选择器">
    <d-date-time-picker v-model="value1" type="datetime" />
  </d-cell>
  <d-cell title="日期选择器">
    <d-date-time-picker v-model="value2" type="date" />
  </d-cell>
  <d-cell title="年月选择">
    <d-date-time-picker v-model="value3" type="year-month" />
  </d-cell>
  <d-cell title="月日选择">
    <d-date-time-picker v-model="value4" type="month-day" />
  </d-cell>
  <d-cell title="时间选择">
    <d-date-time-picker v-model="value5" type="time" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('2022/4/15 22:58:00')
const value2 = ref('2022/4/15')
const value3 = ref('2022/4')
const value4 = ref('4/15')
const value5 = ref('22:58')
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`DateTimePickerValueType`|-|当前选中的数据|Y|
|title|`string`|-|支持设置一个顶部标题|N|
|visible|`boolean`|`false`|显示与隐藏|N|
|type|`DateTimePickerValue`|`date`|日期格式|N|
|disabled|`boolean`|`false`|是否禁用|N|
|readonly|`boolean`|`false`|是否只读|N|
|formatter|`DateTimePickerFormatter`|-|每列格式化函数|N|
|display-formatter|`string`|-|显示日期格式化，默认取 `type`|N|
|min-date|`Date`|-|最小日期，默认当前日期前 10 年|N|
|max-date|`Date`|-|最大日期，默认当前日期后 10 年|N|

### Slots
|名称|说明|
|---|----|
|trigger-arrow|自定义触发图标|

### 公用类型

```typescript
type DateTimePickerValue = 'date' | 'year-month' | 'month-day' | 'time' | 'datetime' | 'date-hour'

type DateTimePickerValueType = string | Date

type DateTimePickerOption = IData & {
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
}

type DateTimePickerFormatter<V extends string | number = string> = (
  type: DateTimePickerOption['type'],
  value: V
) => V

import type {
  DateTimePickerProps,
  DateTimePickerOption,
  DateTimePickerFormatter,
  DateTimePickerValue
} from '@xuanmo/dl-ui'
```

## 常见问题

### iOS 日期无法识别

如果创建时间使用的是 `new Date('2022-04-15')` 这种格式，需要替换为 `new Date('2022/04/15')` 写法，iOS 系统不认识横线分割模式。
