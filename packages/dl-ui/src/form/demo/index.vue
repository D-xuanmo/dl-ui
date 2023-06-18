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
import { FormStore } from '../store'
import FORM_MODEL from './model'
import { DirectionType } from '../../common'
import { OnFormChange } from '../types'

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
    cascader: ['310000000000', '310100000000', '310104000000', '310104007000'],
    datePicker: '2025/5/18',
    timePicker: '08:35',
    calendarSingle: '2023/3/8',
    calendarMultiple: ['2023/3/8', '2023/3/12'],
    calendarRange: ['2023/3/8', '2023/3/12']
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

fetch(
  'https://my.xuanmo.xin:3202/api/file-server/read-file/4e896e26-0c4a-4d75-b8fb-73f9319b9727'
).then(async (res) => {
  const options = await res.json()
  formStore.updateItem('cascaderPicker', {
    otherProps: {
      ...formStore.getItem('cascader')?.otherProps,
      options
    }
  })
  formStore.updateItem('cascader', {
    otherProps: {
      ...formStore.getItem('cascader')?.otherProps,
      options
    }
  })
})
</script>
