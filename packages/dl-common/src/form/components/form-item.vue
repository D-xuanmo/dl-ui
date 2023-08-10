<template>
  <d-cell
    :class="itemClassName"
    content-align="left"
    :title-width="formProps.labelWidth"
    :layout="formProps.layout"
    :description="model.description"
    :hide-title="formProps.hideLabel || model.hideLabel"
    :colon="formProps.colon"
  >
    <template #title>
      <span
        v-if="showRequiredMark && formProps.requiredMarkPosition === 'left'"
        :class="requiredMarkClassName"
      >
        *
      </span>
      <span>{{ model?.label }}{{ formProps.colon ? ':' : '' }}</span>
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
    <div v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</div>
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
