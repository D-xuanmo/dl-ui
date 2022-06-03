<template>
  <div>BEM 示例：</div>
  <pre v-html="bemExample"></pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../utils/bem'

// 创建 BEM 示例
const [name, bem] = createNamespace('example-bem')

const bemExample = {
  block: bem(),
  block__element: bem('wrapper'),
  'block__element block__element--modifier': bem('menu', ['wrapper']),
  'block__element--modifier': bem('menu', ['wrapper'], true),
  'block__element block__element--modifier1': bem('item', { disabled: true })
}

export default defineComponent({
  name,
  setup() {
    return {
      className: bem(),
      bemExample: JSON.stringify(bemExample, null, 2)
    }
  }
})
</script>
