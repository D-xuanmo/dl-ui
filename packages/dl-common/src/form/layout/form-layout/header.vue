<template>
  <form-render-item v-for="item in children" :key="item.id" :model="item" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../../utils'
import { LayoutHeaderProps } from '../../../layout'
import { useLinkChildren } from '../../hooks/use-link-children'
import FormRenderItem from '../../components/form-render-item.vue'
import { IRenderModel } from '../../types'

const [name] = createNamespace('form-layout-header')

export default defineComponent({
  name,
  components: {
    FormRenderItem
  },
  props: {
    model: {
      type: Object as PropType<IRenderModel<LayoutHeaderProps>>,
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
