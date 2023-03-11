# 全局说明

## 公用 TS 类型

> 文件地址 [https://github.com/D-xuanmo/dynamic-form/blob/develop/packages/src/common.ts](https://github.com/D-xuanmo/dynamic-form/blob/develop/packages/src/common.ts)

```typescript
/** 水平对齐方式 */
export type HorizontalAlignType = 'left' | 'center' | 'right'

/** 所有大小类型定义 */
export type SizeType = 'small' | 'medium' | 'large'

/** 格式化触发时机 */
export type FieldFormatterTrigger = 'onChange' | 'onBlur'

/** 弹框位置类型 */
export type PlacementType = 'top' | 'right' | 'bottom' | 'left' | 'center'

/** 主题类型 */
export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'default'

/** 数据基础类型，单选、多选、选择器等组件 */
export type DataType = {
  label: string
  value: string | number
  disabled?: boolean
} & Record<string, any>

/** 排除 props value / modelValue */
export type OmitValueProperties<T extends Record<string, unknown>> = Omit<T, 'value' | 'modelValue'>

export type DirectionType = 'horizontal' | 'vertical'
```
