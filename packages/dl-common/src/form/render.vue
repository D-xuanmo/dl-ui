<template>
  <div :class="wrapperClassName">
    <template v-for="item in data">
      <div
        v-if="item.layout.parent === 'root' && item.display"
        :key="item.id"
        :class="itemClassName"
      >
        <d-form-item v-if="item.dataKey" :model="item" />
        <component :is="item.component" v-else :model="item" />
      </div>
    </template>
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
