<template>
  <form-render-item :is="item.component" v-for="item in children" :key="item.id" :model="item" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../../../utils'
import { useLinkChildren } from '../../hooks'
import FormRenderItem from '../../components/form-render-item.vue'

const [name] = createNamespace('form-layout-content')

export default defineComponent({
  name,
  components: {
    FormRenderItem
  },
  props: {
    model: {
      type: Object,
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
