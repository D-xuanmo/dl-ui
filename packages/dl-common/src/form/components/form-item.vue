<template>
  <template v-if="store.viewLinkageStore.getDisplay(model.id)">
    <d-cell
      v-if="model.dataKey && model.layout.container !== false"
      :class="itemClassName"
      :colon="formProps.colon"
      :round="formProps.round"
      :border="formProps.border"
      :arrow="model.layout.showArrow"
      :description="model.description"
      :title-width="formProps.labelWidth"
      :client-type="formProps.clientType"
      :layout="model.layout.layout || formProps.layout"
      :hide-title="formProps.hideLabel || model.hideLabel"
      :title-vertical-center="model.layout.titleVerticalCenter"
      :content-align="model.layout.layout || formProps.contentAlign"
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
        :store="store"
        :model="model"
        :row-id="rowId"
        :model-value="store.getFieldValue(model.dataKey, rowId)"
        :disabled="store.viewLinkageStore.getDisabled(model.id)"
        :readonly="store.viewLinkageStore.getReadonly(model.id)"
        @update:model-value="handleChange"
      />
      <p v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</p>
    </d-cell>
    <component :is="model.component" v-else :class="itemClassName" :model="model" :row-id="rowId" />
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { createNamespace } from '../../utils'
import { DCell } from '../../cell'
import { createFormBEM, EventPrefixEnum } from '../constants'
import { IFormModelItem } from '../types'
import { omitSystemProps } from '../utils'
import { useForm, useFormEvent } from '../hooks'

const [name] = createNamespace('form-item')

export default defineComponent({
  name,
  components: { DCell },
  props: {
    model: {
      type: Object as PropType<IFormModelItem>,
      required: true,
      default: () => ({})
    },
    rowId: {
      type: String,
      default: undefined
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { store, formProps, onChange: onFormChange } = useForm()
    const { emit: formEventEmit } = useFormEvent(props.model)
    const detailTableId = props.model.detailTableId
    const rowId = props.rowId
    const dataKey = props.model.dataKey
    const itemClassName = createFormBEM('item')
    const errorClassName = createFormBEM('item-message')
    const requiredMarkClassName = createFormBEM('item-requiredMark')
    const colonClass = createFormBEM('item-colon')
    const descriptionClass = createFormBEM('item-description')

    const showRequiredMark = computed(() => {
      return store.viewLinkageStore.getRequired(props.model.id)
    })

    const errorMessage = computed(() => store.getSingleMessage(dataKey, detailTableId, rowId))

    const handleChange = (value: unknown) => {
      props.model.controlled !== true && store.updateFieldValue(dataKey, value, rowId)
      if (errorMessage.value) store.singleValidate(dataKey, detailTableId, rowId)
      emit('change', value, rowId)
      onFormChange({ [dataKey]: value }, props.model, rowId)
      store.events.emit(`${EventPrefixEnum.FIELD}.change`, value, props.model, rowId)
      formEventEmit!('change', value, rowId)
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
      omitSystemProps,
      handleChange
    }
  }
})
</script>
