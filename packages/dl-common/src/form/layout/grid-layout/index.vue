<template>
  <d-grid
    :columns="model.layout.columns"
    :rows="model.layout.rows"
    :gap="model.layout.gap"
    :row-gap="model.layout.rowGap"
    :column-gap="model.layout.columnGap"
  >
    <template v-for="item in children">
      <d-grid-item
        v-if="item.display"
        :key="item.id"
        :row="item.layout.row"
        :column="item.layout.column"
        :height="item.layout.height"
      >
        <d-form-item v-if="item.dataKey" :model="item" />
        <component :is="item.component" v-else :model="item" />
      </d-grid-item>
    </template>
  </d-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../../utils'
import { DGrid, DGridItem, GridProps } from '../../../grid'
import { IRenderModel } from '../../types'
import DFormItem from '../../components/form-item.vue'
import { useLinkChildren } from '../../hooks/use-link-children'

const [name] = createNamespace('grid-layout')

export default defineComponent({
  name,
  components: {
    DGrid,
    DGridItem,
    DFormItem
  },
  props: {
    model: {
      type: Object as PropType<IRenderModel<GridProps>>,
      default: () => ({})
    }
  },
  setup(props) {
    const children = useLinkChildren(props.model.layout.children)

    return {
      children
    }
  }
})
</script>
