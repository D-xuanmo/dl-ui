# DatePicker 日期选择器

用于选择日期时间

```vue playground=9udbre height=500

```

## API

### Props

| 参数      | 类型                  | 默认值  | 说明                 | 必传 |
| --------- | --------------------- | ------- | -------------------- | ---- |
| v-model   | `DatePickerValueType` | -       | 当前选中的数据       | Y    |
| title     | `string`              | -       | 支持设置一个顶部标题 | N    |
| visible   | `boolean`             | `false` | 显示与隐藏           | N    |
| type      | `DatePickerType`      | `date`  | 日期格式             | N    |
| formatter | `FormatterType`       | -       | 每列格式化函数       | N    |

### 公用类型

```typescript
export type DatePickerType = 'date' | 'year-month' | 'month-day' | 'time' | 'datetime' | 'date-hour'

export type DatePickerValueType = string | Date

export type FormatterType<V extends string | number = string> = (
  type: DateTimePickerColumnType['type'],
  value: V
) => V
```
