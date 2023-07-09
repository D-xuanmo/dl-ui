<template>
  <d-cell-group :title="model.label">
    <form-item v-for="item in children" :key="item.dataKey" :model="item" />
  </d-cell-group>
</template>

<script lang="ts">
import { createNamespace } from '../../../utils'
import { computed, defineComponent, inject, PropType } from 'vue'
import { IFormModelItem, IRenderModel } from '../../types'
import { DCellGroup } from '../../../cell-group'
import FormItem from '../../form-item.vue'
import { FORM_CONTEXT_KEY, IFormContext } from '../../context'

const [name] = createNamespace('form-cell-group')

export default defineComponent({
  name,
  components: {
    DCellGroup,
    FormItem
  },
  props: {
    model: {
      type: Object as PropType<IRenderModel>,
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
