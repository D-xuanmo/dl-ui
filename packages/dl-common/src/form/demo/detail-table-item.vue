<template>
  <d-cell-group>
    <d-space :gap="10">
      <d-button theme="primary" size="small" @click="copyRow">复制行</d-button>
      <d-button theme="danger" size="small" @click="deleteRow">删除行</d-button>
    </d-space>
    <d-form-item v-for="item in children" :key="item.id" :model="item" :row-id="rowId" />
  </d-cell-group>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { IFormModelItem, DFormItem, useForm } from '@xuanmo/dl-common'

const props = defineProps<{
  rowId: string
  detailTableId: string
  children: IFormModelItem[]
}>()

const { store } = useForm()

const copyRow = () => {
  store.detailTableStore.copyRow(props.detailTableId, props.rowId)
}

const deleteRow = () => {
  store.detailTableStore.deleteRow(props.detailTableId, props.rowId)
}
</script>
