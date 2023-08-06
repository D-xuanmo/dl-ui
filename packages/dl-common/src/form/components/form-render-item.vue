<template>
  <d-form-item v-if="model.dataKey" :model="model" />
  <component :is="model.component" v-else :model="model" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from 'vue/dist/vue'
import { IFormModelItem } from '../types'
import { createNamespace } from '../../utils'
import DFormItem from './form-item.vue'

const [name] = createNamespace('form-render-item')

export default defineComponent({
  name,
  components: {
    DFormItem
  },
  props: {
    model: {
      type: Object as PropType<IFormModelItem>,
      required: true,
      default: () => ({})
    }
  }
})
</script>
