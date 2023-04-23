# Form 表单

主要用于数据录入、校验等

## 示例

```vue playground=Form height=600

```

## API

### Props

| 参数                   | 类型                         | 默认值       | 说明             | 必传 |
| ---------------------- | ---------------------------- | ------------ | ---------------- | ---- |
| store                  | `FormStore`                  | -            | 表单 store       | Y    |
| disabled               | `boolean`                    | -            | 表单禁用         | N    |
| readonly               | `boolean`                    | -            | 表单只读         | N    |
| label-width            | `string \| number`           | `80px`       | 标题宽度         | N    |
| layout                 | `'horizontal' \| 'vertical'` | `horizontal` | 布局类型         | N    |
| colon                  | `boolean`                    | `false`      | 是否显示冒号     | N    |
| required-mark-position | `'left' \| 'right'`          | `right`      | 必填标识显示位置 | N    |

### Events

| 事件名 | 类型                                                              | 说明                   |
| ------ | ----------------------------------------------------------------- | ---------------------- |
| change | `(value: Record<string, unknown>, model: IFormModelItem) => void` | 表单数据发生改变时触发 |

### FormStore API

```typescript
class FormStore {
  /**
   * 表单数据模型
   */
  models: UnwrapNestedRefs<Map<string, IFormModelItem>>

  /**
   * 分组信息
   */
  groups: UnwrapNestedRefs<Map<string, FormGroupItem & { items: string[] }>>

  /**
   * 校验失败错误信息
   */
  errorMessages: UnwrapNestedRefs<Record<string, string>>

  /**
   * 更新数据
   * @param data
   */
  updateData: (data: Record<string, unknown>) => void

  /**
   * 更新单个 item 信息
   * @param key
   * @param item
   */
  updateItem: (key: string, item: Partial<IFormModelItem>) => void

  /**
   * 获取单个 item 信息
   * @param name 字段名
   */
  getItem: (name: string) => IFormModelItem<unknown, Record<string, any>> | undefined

  /**
   *
   * @returns 获取表单数据
   */
  getFormData: () => Record<string, unknown>

  /**
   * 表单重置
   */
  reset: () => void

  /**
   * 表单校验
   */
  validate: () => Promise<boolean | Record<string, string>>

  /**
   * 单个校验
   * @param name 字段名
   */
  singleValidate: (name: string) => void

  convertModel: () => IFormModelItem<unknown, Record<string, any>>[]
}
```

### 其他类型

```typescript
/**
 * 表单数据模型
 */
export type FormModel = Array<IFormModelItem>

/**
 * 表单单个分组信息
 */
export type FormGroupItem = {
  id: string
  title: string
  hide?: boolean
}

/**
 * 表单分组信息
 */
export type FormGroups = Array<FormGroupItem>

export interface IFormModelItem<TValue = unknown, TProps = Record<string, any>> {
  // 对应的数据键名
  name: string
  label: string
  value: TValue

  // 对应渲染的组件
  component: ComponentNames | string | Component

  // 是否必填，会展示必填星号
  required?: boolean

  // 左侧标题宽度
  labelWidth?: string | number

  // 校验规则
  rules?: string

  // 错误信息，用于覆盖校验失败的提示，不建议使用
  errorMessage?: string

  // 是否隐藏当前字段，默认不隐藏
  hide?: boolean

  // 对应的分组
  groupId?: string

  // 组件的其他参数
  otherProps?: TProps
}
```
