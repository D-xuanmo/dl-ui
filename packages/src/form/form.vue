<template>
  <form :class="formClassName" @submit.prevent>
    <d-form-item
      v-for="[name, item] in store?.model"
      :key="name"
      :model-item="item"
      :store="store"
      :disabled="disabled"
      :readonly="readonly"
      :label-width="labelWidth"
      :error-message="store?.errorMessages?.[name]"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FORM_PROPS } from './props'
import DFormItem from './form-item.vue'
import { formNamespace, createFormBEM } from './constants'

export default defineComponent({
  name: formNamespace,
  components: {
    DFormItem
  },
  props: FORM_PROPS,
  setup() {
    const formClassName = createFormBEM()

    return {
      formClassName
    }
  }
})
</script>
