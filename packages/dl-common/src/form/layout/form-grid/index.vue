<template>
  <d-grid
    :columns="model.layout.columns"
    :rows="model.layout.rows"
    :gap="model.layout.gap"
    :row-gap="model.layout.rowGap"
    :column-gap="model.layout.columnGap"
  >
    <d-grid-item
      v-for="item in children"
      :key="item.id"
      :row="item.layout.row"
      :column="item.layout.column"
      :height="item.layout.height"
    >
      <form-item :model="item" />
    </d-grid-item>
  </d-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../../utils'
import { DGrid, DGridItem, GridProps } from '../../../grid'
import { IRenderModel } from '../../types'
import { useLinkChildren } from '../../hooks'
import FormItem from '../../components/form-item.vue'

const [name] = createNamespace('form-grid')

export default defineComponent({
  name,
  components: {
    FormItem,
    DGrid,
    DGridItem
  },
  props: {
    model: {
      type: Object as PropType<IRenderModel<GridProps>>,
      default: () => ({})
    }
  },
  setup(props) {
    const children = useLinkChildren(props.model.id)

    return {
      children
    }
  }
})
</script>
