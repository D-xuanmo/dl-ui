<template>
  <d-cell-group layout="vertical">
    <d-cell title="基础用法">
      <d-search v-model="value" placeholder="请输入关键词" />
    </d-cell>
    <d-cell title="显示高级搜索">
      <d-search
        v-model="value"
        placeholder="请输入关键词"
        :advanced-search="true"
        :form-props="{ models: formModels }"
        @confirm="onConfirm"
      />
    </d-cell>
    <d-cell title="显示圆角">
      <d-search v-model="value" :round="true" />
    </d-cell>
    <d-cell title="对齐方式">
      <d-search v-model="value" input-align="center" />
    </d-cell>
    <d-cell title="禁用状态">
      <d-search v-model="value" :disabled="true" />
    </d-cell>
    <d-cell title="只读状态">
      <d-search v-model="value" :readonly="true" />
    </d-cell>
  </d-cell-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormModels } from '@xuanmo/dl-common'

const value = ref('')

const formModels: FormModels = [
  {
    id: 'group1',
    component: 'DFormCellGroup',
    label: '分组 1',
    layout: {
      parent: 'root'
    }
  },
  {
    id: 'group2',
    component: 'DFormCellGroup',
    label: '分组 2',
    layout: {
      parent: 'root'
    }
  },
  {
    id: 'id1',
    dataKey: 'inputKey',
    component: 'DInput',
    label: '输入框',
    layout: {
      parent: 'group1'
    },
    placeholder: '请输入需要查询的名称',
    value: ''
  },
  ...Array.from({ length: 20 }).map((_, index) => ({
    id: `id0${index}`,
    dataKey: `timeKey0${index}`,
    component: 'DDateTimePicker',
    label: `日期时间${index}`,
    layout: {
      parent: 'group2'
    }
  }))
]

const onConfirm = (value) => {
  console.log(value)
}
</script>
