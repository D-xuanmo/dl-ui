<template>
  <d-form :store="formStore" :disabled="formDisabled" :readonly="formReadonly" label-width="100" />
  <d-cell-group title="表单操作" cell-content-align="right">
    <d-cell title="表单禁用">
      <d-switch v-model="formDisabled" />
    </d-cell>
    <d-cell title="表单只读">
      <d-switch v-model="formReadonly" />
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
import { dCookie } from '@xuanmo/javascript-utils'
import { UploadProps } from '../../upload'
import { ref } from 'vue'
import { PickerProps } from '../../picker'
import { RadioGroupProps } from '../../radio-group'
import { FormStore } from '../store'
import { InputProps } from '../../input'
import CustomInput from './custom-input.vue'

const formDisabled = ref(false)
const formReadonly = ref(false)

const formStore = new FormStore({
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
      required: true,
      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '请输入文字',
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
        disabled: true,
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
      label: '级联选择',
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
      value: [],
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
          'X-XSRF-TOKEN': dCookie.getItem('csrfToken')
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
    },
    {
      name: 'customInput1',
      component: CustomInput,
      label: '自定义组件1',
      value: '',
      required: true,
      groupId: 'extend',
      otherProps: {
        placeholder: '直接传入一个 vue 组件'
      }
    }
  ]
})

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

fetch('/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727').then(async (res) => {
  formStore.updateItem('cascader', {
    otherProps: {
      ...formStore.getItem('cascader')?.otherProps,
      columns: await res.json()
    }
  })
})
</script>
