<template>
  <div :class="wrapperClassName">
    <form-item v-for="item in children" :key="item.id" :model="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../../utils'
import FormItem from './form-item.vue'
import { useLinkChildren } from '../hooks'

const [name, bem] = createNamespace('form-render')

export default defineComponent({
  name,
  components: {
    FormItem
  },
  setup() {
    const wrapperClassName = bem()
    const children = useLinkChildren('root')

    return {
      wrapperClassName,
      children
    }
  }
})
</script>
