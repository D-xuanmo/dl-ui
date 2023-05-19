<template>
  <d-cell
    :class="itemClassName"
    content-align="left"
    :title-width="labelWidth"
    :layout="layout"
    :description="modelItem.description"
    :hide-title="hideLabel || modelItem.hideLabel"
  >
    <template #title>
      <span
        v-if="showRequiredMark && requiredMarkPosition === 'left'"
        :class="requiredMarkClassName"
      >
        *
      </span>
      <span>{{ modelItem?.label }}{{ colon ? ':' : '' }}</span>
      <span
        v-if="showRequiredMark && requiredMarkPosition === 'right'"
        :class="requiredMarkClassName"
      >
        *
      </span>
    </template>
    <component
      :is="modelItem.component"
      v-model="modelItem.value"
      v-bind="modelItem.otherProps"
      :disabled="itemDisable"
      :readonly="itemReadonly"
      @update:model-value="handleChange"
    />
    <div v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</div>
  </d-cell>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createNamespace } from '@xuanmo/dl-common'
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
  emits: ['change'],
  setup(props, { emit }) {
    const itemClassName = createFormBEM('item')
    const errorClassName = createFormBEM('item', 'message', true)
    const requiredMarkClassName = createFormBEM('item', 'required-mark', true)

    const itemDisable = computed(() => props.disabled || props.modelItem?.otherProps?.disabled)
    const itemReadonly = computed(() => props.readonly || props.modelItem?.otherProps?.readonly)

    const showRequiredMark = computed(() => {
      return props.modelItem!.required || props.modelItem!.rules?.includes('required')
    })

    const handleChange = (value: unknown) => {
      if (props.errorMessage) {
        ;(props.store as FormStore)?.singleValidate(props.modelItem.name)
      }
      emit('change', { [props.modelItem.name]: value }, props.modelItem)
    }

    return {
      itemClassName,
      errorClassName,
      itemDisable,
      itemReadonly,
      requiredMarkClassName,
      showRequiredMark,
      handleChange
    }
  }
})
</script>
