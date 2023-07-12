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
      <d-form-item :model="item" />
    </d-grid-item>
  </d-grid>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '../../../utils'
import { DGrid, DGridItem, GridProps } from '../../../grid'
import { IFormModelItem, IRenderModel } from '../../types'
import { FORM_CONTEXT_KEY, IFormContext } from '../../context'
import DFormItem from '../../components/form-item.vue'

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
    const { store } = inject(FORM_CONTEXT_KEY) as IFormContext

    const children = computed(() => {
      return (props.model.layout.children?.map((item: string) => store.getItem(item)) ??
        []) as IFormModelItem[]
    })

    return {
      children
    }
  }
})
</script>
