<template>
  <div :class="wrapperClassName">
    <template v-for="item in data">
      <form-render-item
        v-if="item.layout.parent === 'root' && item.display"
        :key="item.id"
        :class="itemClassName"
        :model="item"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createNamespace } from '../../utils'
import { IFormModelItem } from '../types'
import FormRenderItem from './form-render-item.vue'

const [name, bem] = createNamespace('form-render')

export default defineComponent({
  name,
  components: {
    FormRenderItem
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
