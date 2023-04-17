<template>
  <d-cell :class="itemClassName" content-align="left" :title-width="labelWidth">
    <template #title>
      <span>{{ modelItem?.label }}</span>
      <span
        v-if="modelItem!.required || modelItem!.rules?.includes('required')"
        :class="requiredMarkClassName"
        >*</span
      >
    </template>
    <component
      :is="modelItem!.component as string"
      v-bind="modelItem?.otherProps"
      v-model="modelItem!.value"
      :disabled="disabled"
      :readonly="readonly"
      @update:model-value="handleChange"
    />
    <div v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</div>
  </d-cell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../utils'
import { FORM_ITEM_PROPS } from './props'
import DCell from '../cell'
import { createFormBEM } from './constants'
import type { FormStore } from './store'

const [name] = createNamespace('form-item')

export default defineComponent({
  name,
  components: {
    DCell
  },
  props: FORM_ITEM_PROPS,
  setup(props) {
    const itemClassName = createFormBEM('item')
    const errorClassName = createFormBEM('item', 'message', true)
    const requiredMarkClassName = createFormBEM('item', 'required-mark', true)

    const handleChange = () => {
      if (props.errorMessage) {
        ;(props.store as FormStore)?.singleValidate(props.modelItem.name)
      }
    }

    return {
      itemClassName,
      errorClassName,
      requiredMarkClassName,
      handleChange
    }
  }
})
</script>
