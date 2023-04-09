# Form 表单

## 组件亮点

- 内置表单组件：输入框、单选框、复选框、开关、评分、选择器、时间选择器、上传；
- 用最少得代码，完成表单的渲染；
- 表单支持分组模式，可将信息录入进行分组展示；
- 与其他 `Vant-UI`、`Element-plus` 等组件不同的是，一个表单的渲染通过 `JSON` 配置即可完成，不需要进行二次封装；
- 表单校验可以与组件业务逻辑可以做到很好的拆分，校验支持扩展等，更多用法参考 [https://github.com/D-xuanmo/validator](https://github.com/D-xuanmo/validator)；
- 表单可支持扩展业务场景更多的组件，本质上表单组件只是针对通用逻辑、校验等场景做了封装，每个子组件按统一规范开发即可融入到表单，无需要关心数据层、校验等；
- 更多功能开发中...

## 示例

```vue playground=Form height=600

```

## API

### Props

| 参数        | 类型               | 默认值 | 说明       | 必传 |
| ----------- | ------------------ | ------ | ---------- | ---- |
| store       | `FormStore`        | -      | 表单 store | Y    |
| disabled    | `boolean`          | -      | 表单禁用   | N    |
| readonly    | `boolean`          | -      | 表单只读   | N    |
| label-width | `string \| number` | `80px` | 标题宽度   | N    |

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
   * 是否为分组模式
   */
  isGroupMode: boolean

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
  getFormData: () => {}

  /**
   * 表单重置
   */
  reset: () => void

  /**
   * 表单校验
   */
  validate: () => Promise<unknown>

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
