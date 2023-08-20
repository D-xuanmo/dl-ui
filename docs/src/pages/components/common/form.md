# Form 表单

## 表单概念解释

- `Form item` 一个数据单元对应 (`一个标题 + 一个输入型组件` 或者 `一个任意组件`) + 描述组成；
- `Layout container` 布局容器，在表单的字段上层加入布局维度，使表单字段不受限于一种风格，可达到组件任意布局，更加灵活；
- `Layout item` 布局组件的子项，用于和布局容器做父子绑定，整体渲染流程：`Layout container => Layout item => Form item`，布局还可以继续嵌套布局组件，实现更复杂的场景；
- `Form store` 所有与数据、校验、事件等操作，统一由 `store` 提供能力，`Form` 组件只负责渲染。

## 整体架构

- 表单不仅仅是表单，页面一切皆可为表单；
- 表单主要提供数据处理、数据校验、联动等功能；
- 表单不区分 PC、H5，表单只是作为一个容器，可以容纳 PC、H5、任意第三方组件库的组件，不关心子级的具体渲染，非表单组件也可以渲染，具体展示效果由子级自行处理；
- 关于布局，组件库已实现[单例分组](https://www.xuanmo.xin/-/dl-ui/comp-common/cell)、[网格系统](https://www.xuanmo.xin/-/dl-ui/comp-common/grid)、[框架](https://www.xuanmo.xin/-/dl-ui/comp-common/layout)等布局类组件，用户也可以自行实现布局组件，做不一样的展示效果，只需要通过父子级关系绑定即可。

![Form 架构](https://upyun.xuanmo.xin/dl-ui/form.png)

## 引入

```typescript
import { createApp } from 'vue';
import {
  // 表单组件
  DForm,
  
  // 单列分组容器（可选），用法参考：https://www.xuanmo.xin/-/dl-ui/comp-common/cell
  DFormCellGroup,
  
  // 网格布局系统（可选），用法参考：https://www.xuanmo.xin/-/dl-ui/comp-common/grid
  DFormGrid,
  
  // 以下 5 布局组件（可选），用法参考：https://www.xuanmo.xin/-/dl-ui/comp-common/layout
  DFormLayout,
  DFormLayoutHeader,
  DFormLayoutFooter,
  DFormLayoutSider,
  DFormLayoutContent,
  
  // 表单 store
  FormStore
} from '@xuanmo/dl-common'

// 注册组件
const app = createApp()
app.use(DForm).use(DFormCellGroup).use(DFormGrid)
```

## 代码演示

```vue client=Mobile title=移动端所有组件 playground=Form
<template>
  <d-form
    ref='formRef'
    :models="formModel"
    client-type="MOBILE"
    :disabled="formDisabled"
    :readonly="formReadonly"
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
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </d-cell>
  </d-cell-group>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { dCookie } from '@xuanmo/utils'
import { IFormModelItem } from '../types'

const formModel: IFormModelItem[] = [
  {
    id: 'basicGroup',
    label: '内置组件',
    component: 'DFormCellGroup',
    layout: {
      parent: 'root',
      children: [
        'input',
        'textarea',
        'disabledInput',
        'email',
        'switch',
        'rate',
        'calendarSingle',
        'calendarMultiple',
        'calendarRange',
        'picker',
        'multiPicker',
        'cascaderPicker',
        'cascader',
        'datePicker',
        'timePicker',
        'radio',
        'checkbox',
        'upload'
      ]
    }
  },
  {
    id: 'input',
    dataKey: 'input',
    component: 'DInput',
    label: '输入框',
    value: '',
    description: '1、这是一段很长很长的备注。\n2、我这一段备注不仅长而且有两行',
    required: true,
    layout: {
      parent: 'basicGroup'
    },
    placeholder: '请输入文字'
  },
  {
    id: 'textarea',
    dataKey: 'textarea',
    component: 'DTextarea',
    label: '多行文本框',
    value: '',
    required: true,
    layout: {
      parent: 'basicGroup'
    },
    placeholder: '请输入文字',
    maxlength: 80,
    showWordLimit: true
  },
  {
    id: 'disabledInput',
    dataKey: 'disabledInput',
    component: 'DInput',
    label: '被禁用的输入框',
    value: '',
    layout: {
      parent: 'basicGroup'
    },
    placeholder: '这个输入框被禁用了',
    disabled: true
  },
  {
    id: 'email',
    dataKey: 'email',
    component: 'DInput',
    label: '邮箱',
    value: '',
    rules: 'required|email',
    layout: {
      parent: 'basicGroup'
    },
    placeholder: '请输入邮箱'
  },
  {
    id: 'switch',
    dataKey: 'switch',
    component: 'DSwitch',
    label: '开关',
    layout: {
      parent: 'basicGroup'
    },
    value: false
  },
  {
    id: 'rate',
    dataKey: 'rate',
    component: 'DRate',
    label: '评分',
    layout: {
      parent: 'basicGroup'
    },
    value: 0
  },
  {
    id: 'calendarSingle',
    dataKey: 'calendarSingle',
    component: 'DCalendar',
    label: '日历单选',
    layout: {
      parent: 'basicGroup'
    },
    value: '',
    placeholder: '请选择',
    minDate: new Date(2023, 0, 1)
  },
  {
    id: 'calendarMultiple',
    dataKey: 'calendarMultiple',
    component: 'DCalendar',
    label: '日历多选',
    layout: {
      parent: 'basicGroup'
    },
    value: '',
    placeholder: '请选择',
    type: 'multiple',
    minDate: new Date(2023, 0, 1)
  },
  {
    id: 'calendarRange',
    dataKey: 'calendarRange',
    component: 'DCalendar',
    label: '日历区间',
    layout: {
      parent: 'basicGroup'
    },
    value: '',
    placeholder: '请选择',
    type: 'range',
    minDate: new Date(2023, 0, 1)
  },
  {
    id: 'picker',
    dataKey: 'picker',
    component: 'DPicker',
    label: '选择器',
    value: [],
    layout: {
      parent: 'basicGroup'
    },
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  },
  {
    id: 'multiPicker',
    dataKey: 'multiPicker',
    component: 'DPicker',
    label: '多列选择器',
    value: ['1', '2-2'],
    layout: {
      parent: 'basicGroup'
    },
    title: '多列选择器',
    options: [
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
  },
  {
    id: 'cascaderPicker',
    dataKey: 'cascaderPicker',
    component: 'DPicker',
    label: '树形选择',
    value: ['110000000000', '110100000000', '110102000000'],
    // value 也可以是对象数组
    // value: [
    //   { value: '110000000000', label: '北京市' },
    //   { value: '110100000000', label: '市辖区' },
    //   { value: '110102000000', label: '西城区' }
    // ],
    layout: {
      parent: 'basicGroup'
    },
    title: '使用选择器模拟级联选择',
    placeholder: '数据加载中...',
    options: []
  },
  {
    id: 'cascader',
    dataKey: 'cascader',
    component: 'DCascader',
    label: '级联选择',
    value: ['110000000000', '110100000000', '110102000000', '110102007000'],
    // value 也可以是对象数组
    // value: [
    //   { value: '110000000000', label: '北京市' },
    //   { value: '110100000000', label: '市辖区' },
    //   { value: '110102000000', label: '西城区' }
    // ],
    layout: {
      parent: 'basicGroup'
    },
    placeholder: '数据加载中...',
    options: []
  },
  {
    id: 'datePicker',
    dataKey: 'datePicker',
    component: 'DDateTimePicker',
    label: '日期选择器',
    layout: {
      parent: 'basicGroup'
    },
    value: '2022/4/15'
  },
  {
    id: 'timePicker',
    dataKey: 'timePicker',
    component: 'DDateTimePicker',
    label: '日期选择器',
    layout: {
      parent: 'basicGroup'
    },
    value: '22:58',
    type: 'time'
  },
  {
    id: 'radio',
    dataKey: 'radio',
    component: 'DRadioGroup',
    label: '单选框',
    value: '2',
    layout: {
      parent: 'basicGroup'
    },
    direction: 'horizontal',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  },
  {
    id: 'checkbox',
    dataKey: 'checkbox',
    component: 'DCheckboxGroup',
    label: '复选框',
    value: ['1'],
    layout: {
      parent: 'basicGroup'
    },
    direction: 'horizontal',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  },
  {
    id: 'upload',
    dataKey: 'upload',
    component: 'DUpload',
    label: '上传',
    layout: {
      parent: 'basicGroup'
    },
    value: [
      {
        url: 'https://my.xuanmo.xin:3000/api/my-admin/p/file/read/02e535e6-8348-423e-8cf5-0d480fa4d247'
      }
    ],
    action: '/api/my-admin/p/file/upload',
    data: {
      type: 'media',
      directoryId: '1de547bf-67d4-4a7d-bb88-2178090327c8'
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
]

const formRef = ref()
const formDisabled = ref(false)
const formReadonly = ref(false)
const hideLabel = ref(false)
const formLayout = ref('horizontal')

const formLayoutOptions = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' }
]

const formData = computed(() => formRef.value?.store?.getFormData?.())

const validate = () => {
  formRef.value.store
    .validate()
    .then(() => {
      console.log('校验通过')
    })
    .catch((error) => {
      console.log('校验失败', error)
    })
}

const getFormData = () => {
  console.log(formRef.value.store.getFormData())
}

const updateData = () => {
  formRef.value.store.updateData({
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
    cascader: ['310000000000', '310100000000', '310104000000', '310104007000'],
    datePicker: '2025/5/18',
    timePicker: '08:35',
    calendarSingle: '2023/3/8',
    calendarMultiple: ['2023/3/8', '2023/3/12'],
    calendarRange: ['2023/3/8', '2023/3/12']
  })
}

const hideFirstRow = () => {
  formRef.value.store.updateModel('input', {
    hide: true
  })
}

const reset = () => {
  formRef.value.store.reset()
}

const handleChange: OnFormChange = (value, model) => {
  console.log(value, model)
}

fetch(
  'https://my.xuanmo.xin:3000/api/my-admin/p/file/read/335f8ac3-f7f5-4408-ab30-a25000041190'
).then(async (res) => {
  const options = await res.json()
  formRef.value.store.updateModel('cascaderPicker', {
    options
  })
  formRef.value.store.updateModel('cascader', {
    options
  })
})
</script>
```

```vue title=通过Grid组件实现布局 playground=FormGrid
<template>
  <d-form
    ref='formRef'
    :models="formModel"
    client-type="PC"
    layout="vertical"
  />
  <d-space :gap='10' style='margin-top: 16px'>
    <d-button theme="primary" @click="validate">验证</d-button>
    <d-button @click="reset">重置</d-button>
  </d-space>
  <pre>{{ JSON.stringify(formData) }}</pre>
</template>

<script setup>
import { ref, computed } from 'vue'
const formRef = ref()
const formModel = [
  {
    id: 'grid',
    component: 'DFormGrid',
    layout: {
      parent: 'root',
      columns: 6,
      gap: 16,
      children: ['name', 'phone', 'email', 'sex', 'status', 'birthday']
    }
  },
  {
    id: 'name',
    dataKey: 'name',
    component: 'DInput',
    label: '姓名',
    value: '',
    required: true,
    layout: {
      parent: 'grid',
      column: 6
    },
    placeholder: '请输入姓名'
  },
  {
    id: 'phone',
    dataKey: 'phone',
    component: 'DInput',
    label: '电话',
    value: '',
    rules: 'required',
    layout: {
      parent: 'grid',
      column: 3
    },
    placeholder: '请输入电话'
  },
  {
    id: 'email',
    dataKey: 'email',
    component: 'DInput',
    label: '邮箱',
    value: '',
    rules: 'required|email',
    layout: {
      parent: 'grid',
      column: 3
    },
    placeholder: '请输入邮箱'
  },
  {
    id: 'birthday',
    dataKey: 'birthday',
    component: 'DCalendar',
    label: '出生日期',
    value: '',
    rules: 'required',
    layout: {
      parent: 'grid',
      column: 2
    },
    placeholder: '请选择日期'
  },
  {
    id: 'sex',
    dataKey: 'sex',
    component: 'DRadioGroup',
    label: '性别',
    value: '',
    rules: 'required',
    layout: {
      parent: 'grid',
      column: 2
    },
    direction: 'horizontal',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' },
    ]
  },
  {
    id: 'status',
    dataKey: 'status',
    component: 'DSwitch',
    label: '状态',
    value: false,
    rules: 'required',
    layout: {
      parent: 'grid',
      column: 2
    },
  },
]
const formData = computed(() => formRef.value?.store?.getFormData?.())

const validate = () => {
  formRef.value?.store.validate()
}

const reset = () => {
  formRef.value?.store.reset()
}
</script>

<style scoped>
::v-deep(.d-grid-item) {
  border-bottom: 1px solid var(--d-border-color);
}
</style>
```

```vue title=结合Layout组件实现布局 playground=FormLayout
<template>
  <d-form :models="formModels" />
</template>

<script lang="ts" setup>
const formModels = [
  {
    id: 'layout',
    component: 'DFormLayout',
    layout: {
      parent: 'root',
      children: ['header', 'footer', 'sider', 'content', 'sider1']
    }
  },
  {
    id: 'header',
    component: 'DFormLayoutHeader',
    layout: {
      parent: 'layout',
      children: ['headerContent'],
      height: 80
    }
  },
  {
    id: 'footer',
    component: 'DFormLayoutFooter',
    layout: {
      parent: 'layout',
      children: ['footerContent'],
      height: 80
    }
  },
  {
    id: 'sider',
    component: 'DFormLayoutSider',
    layout: {
      parent: 'layout',
      children: ['siderContent']
    }
  },
  {
    id: 'content',
    component: 'DFormLayoutContent',
    layout: {
      parent: 'layout',
      children: ['content2']
    }
  },
  {
    id: 'sider1',
    component: 'DFormLayoutSider',
    layout: {
      parent: 'layout',
      children: ['siderContent2'],
      border: true,
      placement: 'right'
    }
  },
  {
    id: 'headerContent',
    dataKey: 'headerContent',
    component: 'DRate',
    layout: {
      parent: 'header'
    },
    label: '评分',
    value: 2,
    description: '我是头部的评分'
  },
  {
    id: 'siderContent',
    dataKey: 'siderContent',
    component: 'DSwitch',
    layout: {
      parent: 'sider'
    },
    label: '开关',
    value: true,
    description: '我是左侧的开关'
  },
  {
    id: 'siderContent2',
    dataKey: 'siderContent2',
    component: 'DSwitch',
    layout: {
      parent: 'sider'
    },
    label: '开关2',
    value: true,
    description: '我是右侧的开关'
  },
  {
    id: 'content2',
    dataKey: 'content2',
    component: 'DSwitch',
    layout: {
      parent: 'content'
    },
    label: '开关3',
    value: false,
    description: '我是内容区的开关'
  },
  {
    id: 'footerContent',
    dataKey: 'footerContent',
    component: 'DRate',
    layout: {
      parent: 'footer'
    },
    label: '评分',
    value: 5,
    description: '我是底部的评分'
  },
]
</script>
```

```vue title=自定义开发表单组件 playground=2dg8da9
<template>
  <d-form
    ref='formRef'
    :models="formModel"
    label-width="100"
  />
  <pre>{{ JSON.stringify(formData) }}</pre>
</template>

<script setup>
import { ref, computed } from 'vue'
const formRef = ref()
const formModel = [
  {
    id: 'customInput',
    dataKey: 'customInput',
    // 组件源码：https://github.com/D-xuanmo/dl-ui/blob/develop/docs/src/components/example/custom-input.vue
    // 这里也有直接传一个组件对象
    component: 'CustomInput',
    label: '自定义组件',
    value: '',
    required: true,
    layout: {
      parent: 'root'
    },
    description: '可以实现很多目前不支持的场景'
  },
]
const formData = computed(() => formRef.value?.store?.getFormData?.())
</script>
```

## API

### 内置布局容器

- `DFormCellGroup` 可以快速实现单列表单分组效果，参考链接：[https://uoo.ink/Form](https://uoo.ink/Form)
- `DFormGrid` 通过 Grid 网格组件实现更灵活的布局，参考链接：[https://uoo.ink/FormGrid](https://uoo.ink/FormGrid)
- `DFormLayout` 通过 Layout 组件实现布局，参考链接：[https://uoo.ink/FormLayout](https://uoo.ink/FormLayout)

### 开发表单组件

1. 组件需要具备 `Vue3` 标准的 `v-model`，参考链接：[https://cn.vuejs.org/guide/components/v-model.html](https://cn.vuejs.org/guide/components/v-model.html)；
2. 数据变更传递，通过 `update:modelValue` 事件；
3. 组件不需要关心标题等标准属性，`FormItem` 会统一处理。

### 更多案例

1. 结合 [TDesign](https://tdesign.tencent.com/vue-next) 实现的表单，参考链接：[https://uoo.ink/DL-TDesign](https://uoo.ink/DL-TDesign)

### Form Props

|参数|类型|默认值|说明|必传|
|---|---|------|---|---|
|models|`FormModels`|-|表单模型|Y|
|client-type|`PC \| MOBILE`|`PC`|终端类型|N|
|store|`FormStore`|-|表单 store，如果需要对 store 进行扩展，可传入处理后的 store，默认通过 `ref` 即可获取到组件内 store 实例|N|
|disabled|`boolean`|-|表单禁用|N|
|readonly|`boolean`|-|表单只读|N|
|label-width|`string \| number`|`80px`|标题宽度|N|
|hide-label|`boolean`|`false`|隐藏 label|N|
|layout|`'horizontal' \| 'vertical'`|`horizontal`|布局类型|N|
|colon|`boolean`|`false`|是否显示冒号|N|
|round|`boolean`|`true`|分组是否展示为圆角|N|
|required-mark-position|`'left' \| 'right'`|`right`|必填标识显示位置|N|
|has-background|`boolean`|`true`|是否显示背景色|N|

### Events

|事件名|类型|说明|
|-----|----|---|
|change|`(value: Record<string, unknown>, model: IFormModelItem) => void`|表单数据发生改变时触发|

### FormStore API

|方法名|类型|说明|
|-----|----|---|
|getFormModels|`() => IFormModelItem<unknown>[]`|获取表单模型|
|getSingleValue|`(dataKey: string) => unknown`|获取单个字段 value|
|getFormData|`() => Record<string, any>`|获取表单数据|
|getItem|`(id: string) => IFormModelItem<unknown> \| undefined`|获取单个 item 信息|
|updateSingleValue|`(dataKey: string, value: any) => void`|更新单个字段数据|
|updateData|`(data: Record<string, unknown>, validate?: boolean) => void`|更新多个字段数据，默认会执行校验|
|updateModel|`(id: string, item: Partial<IFormModelItem>) => void`|更新单个 item 信息|
|setRequired|`(id: string, required: boolean) => void`|设置必填|
|setDisplay|`(id: string, display: boolean) => void`|设置显示隐藏|
|setReadonly|`(id: string, readonly: boolean) => void`|设置只读|
|setDisabled|`(id: string, disabled: boolean) => void`|设置禁用|
|validate|`() => Promise<true \| ValidateReturnType>`|表单校验|
|singleValidate|`(dataKey: string) => void`|单个字段校验|
|getSingleMessage|`(dataKey: string) => string`|获取单个字段的错误信息|
|clearMessages|`() => void`|清空所有校验信息|
|reset|`() => void`|表单重置|

### TS 类型

```typescript
/**
 * 表单数据模型
 */
export type FormModel = Array<IFormModelItem>

export interface IRenderModel<T = any> {
  // 唯一标识，前端独立使用可与 dataKey 相同，非字段类型没有 dataKey 属性
  id: string

  // 需要展示的标题
  label: string

  // 组件
  component: Component | (ComponentNames | string)

  /**
   * 布局信息，这里的泛型代表每个布局组件支持的 props
   * @example
   * [
   *   <IRenderModel<Partial<GridProps>>>{
   *     id: 'customGroup',
   *     label: '自定义组件',
   *     component: 'DFormCellGroup',
   *     layout: {
   *       parent: 'root',
   *       children: ['customInput', 'customInput1'],
   *       columns: 8
   *     }
   *   }
   * ]
   */
  layout: T & {
    // 父级组件，默认需要指定为 root
    parent: string

    // 关联的子级
    children?: string[]
  }

  // 是否显示
  display?: boolean

  // 禁用
  disabled?: boolean

  // 只读
  readonly?: boolean
}

export interface IFormModelItem<TValue = unknown> extends IRenderModel {
  // 对应的数据键名
  dataKey: string

  // 当前字段数据
  value: TValue

  // 是否必填，会展示必填星号
  required?: boolean

  // 左侧标题宽度
  labelWidth?: string | number

  // 隐藏 label，默认：false
  hideLabel?: boolean
  
  /**
   * 校验规则,，对应校验插件的 rules 字段
   * @link https://github.com/D-xuanmo/validator
   * @example 'email|min:5'
   */
  rules?: string

  // 错误信息，用于覆盖校验失败的提示，不建议使用
  errorMessage?: string

  // 是否隐藏当前字段，默认不隐藏
  hide?: boolean

  // 描述字段
  description?: string

  // 外部更多属性
  [key: string]: any
}
```
