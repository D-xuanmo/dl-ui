# DatePicker 日期时间选择器

用于选择日期、时间

```vue client=Mobile playground=MDatePicker
<template>
  <d-cell title="日期时间选择器">
    <d-date-picker v-model="value" type="datetime" title="日期时间选择器" />
  </d-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('2022/4/15 22:58:00')
</script>

```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`DatePickerValueType`|-|当前选中的数据|Y|
|title|`string`|-|支持设置一个顶部标题|N|
|visible|`boolean`|`false`|显示与隐藏|N|
|type|`DatePickerType`|`date`|日期格式|N|
|formatter|`FormatterType`|-|每列格式化函数|N|

### 公用类型

```typescript
type DatePickerType = 'date' | 'year-month' | 'month-day' | 'time' | 'datetime' | 'date-hour'

type DatePickerValueType = string | Date

type FormatterType<V extends string | number = string> = (
  type: DateTimePickerColumnType['type'],
  value: V
) => V

import type {
  DatePickerProps,
  DateTimePickerOption,
  FormatterType,
  DatePickerType
} from '@xuanmo/dl-ui'
```
