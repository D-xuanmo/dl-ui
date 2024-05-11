<template>
  <d-cell-group :title="model.label">
    <d-form-item v-for="item in children" :key="item.dataKey" :model="item" />
  </d-cell-group>
</template>

<script lang="ts">
import { createNamespace } from '../../../utils'
import { defineComponent, PropType } from 'vue'
import { IRenderModel } from '../../types'
import { DCellGroup } from '../../../cell-group'
import DFormItem from '../../components/form-item.vue'
import { useLinkChildren } from '../../hooks'

const [name] = createNamespace('form-cell-group')

export default defineComponent({
  name,
  components: {
    DCellGroup,
    DFormItem
  },
  props: {
    model: {
      type: Object as PropType<IRenderModel>,
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
