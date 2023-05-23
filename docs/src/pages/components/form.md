# Form 表单

主要用于数据录入、校验等

```vue client=Mobile playground=Form previewType=iframe
<template>
  <d-form
    :store="formStore"
    :disabled="formDisabled"
    :readonly="formReadonly"
    :layout="formLayout"
    label-width="100"
    :hide-label="hideLabel"
    @change="handleChange"
  />
  <d-cell-group title="表单操作" style="margin-top: var(--d-gap-sm)">
    <d-cell title="表单禁用">
      <d-switch v-model="formDisabled" />
    </d-cell>
    <d-cell title="表单只读">
      <d-switch v-model="formReadonly" />
    </d-cell>
    <d-cell title="隐藏 label">
      <d-switch v-model="hideLabel" />
    </d-cell>
    <d-cell title="布局切换">
      <d-radio-group v-model="formLayout" :options="formLayoutOptions" direction="horizontal" />
    </d-cell>
    <d-cell hide-title>
      <d-space :gap="10" wrap>
        <d-button @click="validate">执行校验</d-button>
        <d-button @click="getFormData">获取数据</d-button>
        <d-button @click="updateData">更新数据</d-button>
        <d-button @click="hideFirstRow">隐藏第一行</d-button>
        <d-button @click="reset">重置</d-button>
      </d-space>
    </d-cell>
  </d-cell-group>
  <d-cell-group title="表单数据">
    <d-cell>
      <div>{{ formStore.getFormData() }}</div>
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import {
  InputProps,
  PickerProps,
  RadioGroupProps,
  UploadProps,
  FormStoreInitialConfig,
  TextareaProps,
  OnFormChange,
  FormStore,
  DirectionType
} from '@xuanmo/dl-ui'
import { dCookie } from '@xuanmo/javascript-utils'

const FORM_MODEL: FormStoreInitialConfig = {
  groups: [
    { id: 'basic', title: '内置组件' },
    { id: 'extend', title: '扩展功能' }
  ],
  models: [
    {
      name: 'input',
      component: 'DInput',
      label: '输入框',
      value: '',
      description: '1、这是一段很长很长的备注。\n2、我这一段备注不仅长而且有两行',
      required: true,
      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '请输入文字'
      }
    },
    {
      name: 'textarea',
      component: 'DTextarea',
      label: '多行文本框',
      value: '',
      required: true,
      groupId: 'basic',
      otherProps: <TextareaProps>{
        placeholder: '请输入文字',
        maxlength: 80,
        showWordLimit: true
      }
    },
    {
      name: 'disableInput',
      component: 'DInput',
      label: '被禁用的输入框',
      value: '',

      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '这个输入框被禁用了',
        disabled: true
      }
    },
    {
      name: 'email',
      component: 'DInput',
      label: '邮箱',
      value: '',
      rules: 'required|email',
      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '请输入邮箱'
      }
    },
    {
      name: 'switch',
      component: 'DSwitch',
      label: '开关',
      groupId: 'basic',
      value: false
    },
    {
      name: 'rate',
      component: 'DRate',
      label: '评分',
      groupId: 'basic',
      value: 0
    },
    {
      name: 'picker',
      component: 'DPicker',
      label: '选择器',
      value: [],
      groupId: 'basic',
      otherProps: <PickerProps>{
        columns: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'multiPicker',
      component: 'DPicker',
      label: '多列选择器',
      value: ['1', '2-2'],
      groupId: 'basic',
      otherProps: <PickerProps>{
        title: '多列选择器',
        columns: [
          [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
            { label: '选项3', value: '3' }
          ],
          [
            { label: '选项1-1', value: '1-1' },
            { label: '选项2-2', value: '2-2' },
            { label: '选项3-3', value: '3-3' }
          ]
        ]
      }
    },
    {
      name: 'cascader',
      component: 'DPicker',
      label: '树形选择',
      value: ['310000', '310100', '310115'],
      // value 也可以是对象数组
      // value: [
      //   { value: '110000', label: '北京市' },
      //   { value: '110100', label: '市辖区' },
      //   { value: '110102', label: '西城区' }
      // ],
      groupId: 'basic',
      otherProps: <Partial<PickerProps>>{
        title: '使用选择器模拟级联选择',
        placeholder: '点击选择内容',
        columns: []
      }
    },
    {
      name: 'datePicker',
      component: 'DDatePicker',
      label: '日期选择器',
      groupId: 'basic',
      value: new Date()
    },
    {
      name: 'radio',
      component: 'DRadioGroup',
      label: '单选框',
      value: '2',
      groupId: 'basic',
      otherProps: <RadioGroupProps>{
        direction: 'horizontal',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'checkbox',
      component: 'DCheckboxGroup',
      label: '复选框',
      value: ['1'],
      groupId: 'basic',
      otherProps: <RadioGroupProps>{
        direction: 'horizontal',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'upload',
      component: 'DUpload',
      label: '上传',
      groupId: 'basic',
      value: [
        {
          url: 'https://www.xuanmo.xin/api/file-server/read-file/cf5be5e5-a84b-41e9-b91a-c99646039f15'
        }
      ],
      otherProps: <Partial<UploadProps>>{
        action: '/api/file-server/p/upload',
        data: {
          type: 'media'
        },
        headerParams: {
          'X-XSRF-TOKEN': dCookie().getItem('csrfToken')
        },
        uploadAfter(response) {
          // 返回上传组件需要的格式
          return {
            url: (response as any).data?.[0].url,
            deletable: true
          }
        }
      }
    },
    {
      name: 'customInput',
      component: 'CustomInput',
      label: '自定义组件',
      value: '',
      required: true,
      groupId: 'extend',
      otherProps: {
        placeholder: '可以实现很多目前不支持的场景'
      }
    }
  ]
}

const formDisabled = ref(false)
const formReadonly = ref(false)
const hideLabel = ref(false)
const formLayout = ref<DirectionType>('horizontal')

const formStore = new FormStore(FORM_MODEL)

const formLayoutOptions = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' }
]

const validate = () => {
  formStore
    .validate()
    .then(() => {
      console.log('校验通过')
    })
    .catch((error) => {
      console.log('校验失败', error)
    })
}

const getFormData = () => {
  console.log(formStore.getFormData())
}

const updateData = () => {
  formStore.updateData({
    input: 'input 数据',
    switch: true,
    radio: '3',
    checkbox: ['1', '3'],
    picker: ['3'],
    email: 'example@qq.com',
    rate: 3,
    upload: [
      { url: '/api/file-server/read-file/15b1c772-94ca-4e92-92be-d40b47832068', deletable: false },
      { url: '/api/file-server/read-file/15b1c772-94ca-4e92-92be-d40b47832068', deletable: true }
    ],
    customInput: '我是自定义数据',
    cascader: [
      { value: '110000', label: '北京市' },
      { value: '110100', label: '市辖区' },
      { value: '110102', label: '西城区' }
    ]
  })
}

const hideFirstRow = () => {
  formStore.updateItem('input', {
    hide: true
  })
}

const reset = () => {
  formStore.reset()
}

const handleChange: OnFormChange = (value, model) => {
  console.log(value, model)
}

fetch('/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727').then(async (res) => {
  formStore.updateItem('cascader', {
    otherProps: {
      ...formStore.getItem('cascader')?.otherProps,
      columns: await res.json()
    }
  })
})
</script>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|---|------|---|---|
|store|`FormStore`|-|表单store|Y|
|disabled|`boolean`|-|表单禁用|N|
|readonly|`boolean`|-|表单只读|N|
|label-width|`string \| number`|`80px`|标题宽度|N|
|hide-label|`boolean`|false|隐藏 label|N|
|layout|`'horizontal' \| 'vertical'`|`horizontal`|布局类型|N|
|colon|`boolean`|`false`|是否显示冒号|N|
|round|`boolean`|`true`|分组是否展示为圆角|N|
|required-mark-position|`'left' \| 'right'`|`right`|必填标识显示位置|N|

### Events

|事件名|类型|说明|
|-----|----|---|
|change|`(value: Record<string, unknown>, model: IFormModelItem) => void`|表单数据发生改变时触发|

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

  // 隐藏 label，默认：false
  hideLabel?: boolean

  // 校验规则
  rules?: string

  // 错误信息，用于覆盖校验失败的提示，不建议使用
  errorMessage?: string

  // 是否隐藏当前字段，默认不隐藏
  hide?: boolean

  // 对应的分组
  groupId?: string

  // 描述字段
  description?: string

  // 组件的其他参数
  otherProps?: TProps
}
```
