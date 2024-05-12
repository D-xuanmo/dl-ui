<template>
  <d-cell
    v-if="model.dataKey && model.layout.container !== false"
    :class="itemClassName"
    content-align="left"
    :title-width="formProps.labelWidth"
    :layout="model.layout.layout || formProps.layout"
    :hide-title="formProps.hideLabel || model.hideLabel"
    :colon="formProps.colon"
    :round="formProps.round"
    :border="formProps.border"
    :client-type="formProps.clientType"
    :description="model.description"
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
      :model-value="store.getSingleValue(model.dataKey, rowId)"
      :disabled="store.viewLinkageStore.getDisabled(model.id)"
      :readonly="store.viewLinkageStore.getReadonly(model.id)"
      :store="store"
      :model="model"
      @update:model-value="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <p v-if="errorMessage" :class="errorClassName">{{ errorMessage }}</p>
  </d-cell>
  <component :is="model.component" v-else :class="itemClassName" :model="model" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { createNamespace } from '../../utils'
import DCell from '../../cell'
import { createFormBEM, EventPrefixEnum } from '../constants'
import { IFormModelItem } from '../types'
import { omitSystemProps } from '../utils'
import { useForm } from '../hooks'

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
    const dataKey = props.model.dataKey
    const itemClassName = computed(() =>
      createFormBEM('item', {
        hide: !store.viewLinkageStore.getDisplay(props.model.id)
      })
    )
    const errorClassName = createFormBEM('item-message')
    const requiredMarkClassName = createFormBEM('item-requiredMark')
    const colonClass = createFormBEM('item-colon')
    const descriptionClass = createFormBEM('item-description')

    const showRequiredMark = computed(() => {
      return store.viewLinkageStore.getRequired(props.model.id)
    })

    const errorMessage = computed(() => store.getSingleMessage(dataKey))

    const handleChange = (value: unknown) => {
      props.model.controlled !== true && store.updateSingleValue(dataKey, value, props.rowId)
      if (errorMessage.value) store.singleValidate(dataKey)
      emit('change', value, props.rowId)
      onFormChange({ [dataKey]: value }, props.model, props.rowId)
      store.viewLinkageStore.execute(dataKey, value)
      store.events.emit(`${EventPrefixEnum.FIELD}.change`, value, props.rowId)
      store.events.emit(`${EventPrefixEnum.FIELD}.${dataKey}.change`, value, props.rowId)
    }

    const handleBlur = (value: unknown) => {
      store.events.emit(`${EventPrefixEnum.FIELD}.${dataKey}.blur`, value, props.rowId)
    }

    const handleFocus = (value: unknown) => {
      store.events.emit(`${EventPrefixEnum.FIELD}.${dataKey}.focus`, value, props.rowId)
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
      handleChange,
      handleBlur,
      handleFocus
    }
  }
})
</script>
