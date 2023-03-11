# Picker 选择器

> 目前只支持移动端事件

```vue playground=3dtspi3

```

## API

### Props

| 参数                | 类型                                 | 默认值  | 说明                 | 必传 |
| ------------------- | ------------------------------------ | ------- | -------------------- | ---- |
| v-model             | `string[] \| number[] \| DataType[]` | -       | 当前选中的数据       | Y    |
| visible             | `boolean`                            | `false` | 显示与隐藏           | N    |
| columns             | `PickerColumnsType`                  | []      | 选择器列数据         | N    |
| title               | `string`                             | -       | 支持设置一个顶部标题 | N    |
| cancel-button-text  | `string`                             | `取消`  | 关闭按钮文字         | N    |
| confirm-button-text | `string`                             | `确认`  | 确认按钮文字         | N    |
| option-height       | `number`                             | 42      | 单个选项高度         | N    |

### Events

| 事件           | 说明         | 回调参数                                         |
| -------------- | ------------ | ------------------------------------------------ |
| update:visible | 显示隐藏事件 | (visible: boolean) => void                       |
| change         | 确认事件     | (value: PickerValueType, data: DataType) => void |
| confirm        | 确认事件     | (value: PickerValueType) => void                 |
| close          | 关闭事件     | () => void                                       |

## 选择器公用类型

> 公用类型 [https://github.com/D-xuanmo/dynamic-form/blob/develop/packages/src/common.ts](https://github.com/D-xuanmo/dynamic-form/blob/develop/packages/src/common.ts)

```typescript
export type PickerValueType = string[] | number[] | DataType[]

/** 级联选择数据类型 */
export type CascadeDataType = DataType & { children?: DataType[] }

/** 选择器每列数据类型 */
export type PickerColumnType = DataType | CascadeDataType

/** 选择器数据类型 */
export type PickerColumnsType = PickerColumnType[] | PickerColumnType[][]
```
