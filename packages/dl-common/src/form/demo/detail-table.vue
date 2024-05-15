<template>
  <d-detail-table-wrapper :model="model">
    <d-space align="center" justify="between">
      <h2>明细表标题</h2>
      <d-button theme="primary" @click="addRow">添加行</d-button>
    </d-space>
    <detail-table-item
      v-for="[id] in tableData"
      :key="id"
      :row-id="id"
      :detail-table-id="model.detailTableId"
      :children="children"
    />
  </d-detail-table-wrapper>
</template>

<script setup lang="ts">
import { useLinkChildren, DDetailTableWrapper, useForm, IDetailTableItem } from '@xuanmo/dl-common'
import DetailTableItem from './detail-table-item.vue'
import { computed } from 'vue'

const { store } = useForm()

const props = defineProps<{
  model: IDetailTableItem
}>()

const children = useLinkChildren(props.model?.id)

const tableData = computed(() => store.detailTableStore.getTableData(props.model.detailTableId))

const addRow = () => {
  store.detailTableStore.addRow(props.model.detailTableId, undefined)
}
</script>
