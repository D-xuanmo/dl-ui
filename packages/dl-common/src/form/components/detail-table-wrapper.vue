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
    }
  },
  setup(props) {
    const { store } = useForm()

    store.detailTableStore.createEmptyData(props.model.detailTableId)

    return {
      containerClassName: bem()
    }
  }
})
</script>
