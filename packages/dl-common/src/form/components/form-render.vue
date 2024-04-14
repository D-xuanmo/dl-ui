<template>
  <div :class="wrapperClassName">
    <template v-for="item in data">
      <form-item v-if="item.layout.parent.toLowerCase() === 'root'" :key="item.id" :model="item" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../utils'
import { IFormModelItem } from '../types'
import FormItem from './form-item.vue'

const [name, bem] = createNamespace('form-render')

export default defineComponent({
  name,
  components: {
    FormItem
  },
  props: {
    data: {
      type: Array as PropType<IFormModelItem[]>,
      default: () => [],
      require: true
    }
  },
  setup() {
    const wrapperClassName = bem()

    return {
      wrapperClassName
    }
  }
})
</script>
