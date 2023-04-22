<template>
  <d-cell
    :class="itemClassName"
    content-align="left"
    :title-width="labelWidth"
    :layout="layout as any"
  >
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
      v-model="modelItem!.value"
      v-bind="modelItem?.otherProps"
      :disabled="itemDisable"
      :readonly="itemReadonly"
      @update:model-value="handleChange"
    />
    <div v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</div>
  </d-cell>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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

    const itemDisable = computed(() => props.disabled || props.modelItem?.otherProps?.disabled)
    const itemReadonly = computed(() => props.readonly || props.modelItem?.otherProps?.readonly)

    const handleChange = () => {
      if (props.errorMessage) {
        ;(props.store as FormStore)?.singleValidate(props.modelItem.name)
      }
    }

    return {
      itemClassName,
      errorClassName,
      itemDisable,
      itemReadonly,
      requiredMarkClassName,
      handleChange
    }
  }
})
</script>
