<template>
  <div :class="wrapperClassName">
    <div v-for="item in data" :key="item.id" :class="itemClassName">
      <component :is="item.component" v-if="item.layout.isContainer" :model="item" />
      <form-item v-else-if="item.layout.parent === 'root'" :model="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { createNamespace } from '../utils'
import { defineComponent, PropType } from 'vue'
import { IFormModelItem } from './types'
import FormItem from './form-item.vue'

const [name, bem] = createNamespace('render')

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
    const itemClassName = bem('item')

    return {
      wrapperClassName,
      itemClassName
    }
  }
})
</script>
