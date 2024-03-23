<template>
  <d-cell
    :class="itemClassName"
    content-align="left"
    :title-width="formProps.labelWidth"
    :layout="formProps.layout"
    :hide-title="formProps.hideLabel || model.hideLabel"
    :colon="formProps.colon"
    :border="formProps.border"
  >
    <template #title>
      <span
        v-if="showRequiredMark && formProps.requiredMarkPosition === 'left'"
        :class="requiredMarkClassName"
      >
        *
      </span>
      <span>{{ model?.label }}</span>
      <span v-if="formProps.colon" :class="colonClass">:</span>
      <span
        v-if="showRequiredMark && formProps.requiredMarkPosition === 'right'"
        :class="requiredMarkClassName"
      >
        *
      </span>
    </template>
    <component
      v-bind="omitSystemProps(model)"
      :is="model.component"
      :model-value="model.value"
      :disabled="formProps.disabled || model.disabled"
      :readonly="formProps.readonly || model.readonly"
      :store="store"
      @update:model-value="handleChange"
    />
    <p v-if="model.description" :class="descriptionClass">{{ model.description }}</p>
    <p v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</p>
  </d-cell>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'
import { createNamespace } from '../../utils'
import DCell from '../../cell'
import { createFormBEM } from '../constants'
import { FORM_CONTEXT_KEY, IFormContext } from '../context'
import { IFormModelItem } from '../types'
import { omitSystemProps } from '../utils'

const [name] = createNamespace('form-item')

export default defineComponent({
  name,
  components: {
    DCell
  },
  props: {
    model: {
      type: Object as PropType<IFormModelItem>,
      required: true,
      default: () => ({})
    }
  },
  setup(props) {
    const { store, formProps, onChange } = inject(FORM_CONTEXT_KEY) as IFormContext
    const itemClassName = createFormBEM('item')
    const errorClassName = createFormBEM('item-message')
    const requiredMarkClassName = createFormBEM('item-requiredMark')
    const colonClass = createFormBEM('item-colon')
    const descriptionClass = createFormBEM('item-description')

    const showRequiredMark = computed(() => {
      return props.model!.required || props.model!.rules?.includes('required')
    })

    const errorMessage = computed(() => store.getSingleMessage(props.model.dataKey))

    const handleChange = (value: unknown) => {
      store.updateSingleValue(props.model.dataKey, value)
      if (errorMessage.value) {
        store.singleValidate(props.model.dataKey)
      }
      onChange({ [props.model.dataKey]: value }, props.model)
    }

    return {
      itemClassName,
      errorClassName,
      requiredMarkClassName,
      colonClass,
      descriptionClass,
      showRequiredMark,
      errorMessage,
      formProps,
      store,
      handleChange,
      omitSystemProps
    }
  }
})
</script>
