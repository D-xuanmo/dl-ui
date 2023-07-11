<template>
  <div :class="wrapperClassName">
    <div v-for="item in data" :key="item.id" :class="itemClassName">
      <template v-if="item.layout.parent === 'root'">
        <form-item v-if="item.dataKey" :model="item" />
        <component :is="item.component" v-else :model="item" />
      </template>
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
