<template>
  <div :class="wrapperClasses">
    <p :class="titleClassName">{{ title }}</p>
    <div><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@doc/utils'
import './style.scss'

const [name, bem] = createNamespace('demo-block')
export default defineComponent({
  name,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const titleClassName = bem('title')
    return {
      wrapperClasses: bem(),
      titleClassName
    }
  }
})
</script>
