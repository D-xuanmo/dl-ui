<template>
  <d-cell-group :title="model.label">
    <template v-for="item in children">
      <d-form-item v-if="item.display" :key="item.dataKey" :model="item" />
    </template>
  </d-cell-group>
</template>

<script lang="ts">
import { createNamespace } from '../../../utils'
import { defineComponent, PropType } from 'vue'
import { IRenderModel } from '../../types'
import { DCellGroup } from '../../../cell-group'
import DFormItem from '../../components/form-item.vue'
import { useLinkChildren } from '../../hooks/use-link-children'

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
    const children = useLinkChildren(props.model.layout.children)

    return {
      children
    }
  }
})
</script>
