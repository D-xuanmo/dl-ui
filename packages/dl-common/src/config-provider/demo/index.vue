<template>
  <d-cell-group title="表单操作" cell-title-width="100px">
    <d-cell title="标题宽度">
      <d-input v-model="labelWidth" type="number" />
    </d-cell>
    <d-cell title="显示冒号">
      <d-switch v-model="colon" />
    </d-cell>
    <d-cell title="布局切换">
      <d-radio-group v-model="formLayout" :options="formLayoutOptions" direction="horizontal" />
    </d-cell>
    <d-cell title="必填标识位置">
      <d-radio-group
        v-model="requiredMarkPosition"
        :options="requiredMarkPositionOptions"
        direction="horizontal"
      />
    </d-cell>
  </d-cell-group>

  <d-config-provider
    :layout="formLayout"
    :required-mark-position="requiredMarkPosition"
    :label-width="labelWidth"
    :colon="colon"
    :theme="theme"
  >
    <d-cell title="单元格" required>我是单元格内容</d-cell>
    <d-form :models="formModels" client-type="MOBILE" />
  </d-config-provider>
</template>

<script setup lang="tsx">
import { FormModels } from '../../form'
import { ref } from 'vue'
import ButtonGroup from './button-group.vue'

const formLayout = ref<any>('horizontal')
const requiredMarkPosition = ref<any>('left')
const labelWidth = ref(80)
const colon = ref(false)

const formLayoutOptions = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' }
]
const requiredMarkPositionOptions = [
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' }
]

const theme = ref({
  primary: '#bd34fe',
  success: '#20c997',
  warning: '#fab005',
  error: '#f03e3e'
})

const formModels: FormModels = [
  {
    id: 'input',
    dataKey: 'input',
    label: '输入框',
    required: true,
    component: 'DInput',
    layout: {
      parent: 'root'
    },
    placeholder: '请输入',
    value: ''
  },
  {
    id: 'switch',
    dataKey: 'switch',
    label: '开关',
    required: true,
    component: 'DSwitch',
    layout: {
      parent: 'root'
    },
    value: true
  },
  {
    id: 'buttonGroup',
    dataKey: 'buttonGroup',
    label: '按钮',
    component: ButtonGroup,
    required: true,
    layout: {
      parent: 'root'
    }
  }
]
</script>
