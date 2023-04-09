<template>
  <d-cell-group title="表单展示">
    <d-form
      :store="formStore"
      :disabled="formDisabled"
      :readonly="formReadonly"
      label-width="100"
    />
  </d-cell-group>
  <d-cell-group title="表单操作">
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
</template>

<script lang="ts" setup>
import { dCookie } from '@xuanmo/javascript-utils'
import { UploadProps } from '../../upload'
import { ref } from 'vue'
import { PickerProps } from '../../picker'
import { RadioGroupProps } from '../../radio-group'
import { FormStore } from '../store'
import { InputProps } from '../../input'

const formDisabled = ref(false)
const formReadonly = ref(false)

const formStore = new FormStore({
  models: [
    {
      name: 'input',
      component: 'DInput',
      label: '输入框',
      value: '',
      required: true,
      otherProps: <InputProps>{
        placeholder: '请输入文字'
      }
    },
    {
      name: 'customInput',
      component: 'CustomInput',
      label: '自定义组件',
      value: '',
      required: true,
      otherProps: {
        placeholder: '可以实现很多目前不支持的场景'
      }
    },
    {
      name: 'email',
      component: 'DInput',
      label: '邮箱',
      value: '',
      rules: 'required|email',
      otherProps: <InputProps>{
        placeholder: '请输入邮箱'
      }
    },
    {
      name: 'switch',
      component: 'DSwitch',
      label: '开关',
      value: false
    },
    {
      name: 'rate',
      component: 'DRate',
      label: '评分',
      value: 0
    },
    {
      name: 'picker',
      component: 'DPicker',
      label: '选择器',
      value: ['2'],
      otherProps: <PickerProps>{
        columns: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'datePicker',
      component: 'DDatePicker',
      label: '日期选择器',
      value: new Date()
    },
    {
      name: 'radio',
      component: 'DRadioGroup',
      label: '单选框',
      value: '2',
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
      value: [],
      otherProps: <Partial<UploadProps>>{
        action: '/api/file-server/p/upload',
        data: {
          type: 'media'
        },
        headerParams: {
          'X-XSRF-TOKEN': dCookie.getItem('csrfToken')
        },
        uploadAfter(response: any) {
          return {
            url: response.data?.[0].url,
            deletable: true
          }
        }
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
      { url: '/api/file-server/read-file/2d9595e4-af21-4cfa-862d-aa99933fbd7b', deletable: false },
      { url: '/api/file-server/read-file/2d9595e4-af21-4cfa-862d-aa99933fbd7b', deletable: true }
    ],
    customInput: '我是自定义数据'
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
</script>
