<template>
  <div :class="wrapperClassName">
    <div v-for="item in data" :key="item.id" :class="itemClassName">
      <template v-if="item.layout.parent === 'root'">
        <d-form-item v-if="item.dataKey" :model="item" />
        <component :is="item.component" v-else :model="item" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../utils'
import DFormItem from './components/form-item.vue'
import { IFormModelItem } from './types'

const [name, bem] = createNamespace('render')

export default defineComponent({
  name,
  components: {
    DFormItem
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
