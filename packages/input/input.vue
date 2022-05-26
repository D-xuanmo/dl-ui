<template>
  <Cell title="333" required>
    <input :class="bem()" />
  </Cell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '@/utils/bem'
import Cell from '../cell'

const [name, bem] = createNamespace('input')

const props = {
  value: String
}

export default defineComponent({
  name,
  components: {
    Cell
  },
  props,
  setup() {
    return {
      bem
    }
  }
})
</script>
