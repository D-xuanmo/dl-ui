<template>
  <div :class="containerClassName">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../utils'
import { useForm } from '../hooks'
import { IDetailTableItem } from '../types'

const [name, bem] = createNamespace('detail-table')

export default defineComponent({
  name,
  props: {
    model: {
      type: Object as PropType<IDetailTableItem>,
      default: () => ({})
    },
    defaultRows: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const tableId = props.model.detailTableId
    const { store } = useForm()

    if (store.detailTableStore.isEmptyTable(tableId)) {
      store.detailTableStore.createEmptyData(tableId)
      if (props.defaultRows && store.detailTableStore.isEmptyTable(tableId)) {
        store.detailTableStore.updateTableData(
          tableId,
          Array.from({ length: props.defaultRows }).map((_, index) => ({
            rowId: store.idGenerator(),
            dataIndex: index
          }))
        )
      }
    }

    return {
      containerClassName: bem()
    }
  }
})
</script>
