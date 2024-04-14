<template>
  <form-item :is="item.component" v-for="item in children" :key="item.id" :model="item" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../../../utils'
import { useLinkChildren } from '../../hooks'
import FormItem from '../../components/form-item.vue'

const [name] = createNamespace('form-layout-content')

export default defineComponent({
  name,
  components: {
    FormItem
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
