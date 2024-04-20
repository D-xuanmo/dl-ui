<template>
  <d-cell
    v-if="model.dataKey"
    :class="itemClassName"
    content-align="left"
    :title-width="formProps.labelWidth"
    :layout="formProps.layout"
    :hide-title="formProps.hideLabel || model.hideLabel"
    :colon="formProps.colon"
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
      :model-value="store.getSingleValue(model.dataKey)"
      :disabled="store.viewLinkage.getDisabled(model.id)"
      :readonly="store.viewLinkage.getReadonly(model.id)"
      :store="store"
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
import { createFormBEM } from '../constants'
import { IFormModelItem } from '../types'
import { omitSystemProps } from '../utils'
import { useForm } from '../hooks'

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
    const { store, formProps, onChange } = useForm()
    const dataKey = props.model.dataKey
    const itemClassName = computed(() =>
      createFormBEM('item', {
        hide: !store.viewLinkage.getDisplay(props.model.id)
      })
    )
    const errorClassName = createFormBEM('item-message')
    const requiredMarkClassName = createFormBEM('item-requiredMark')
    const colonClass = createFormBEM('item-colon')
    const descriptionClass = createFormBEM('item-description')

    const showRequiredMark = computed(() => {
      return store.viewLinkage.getRequired(props.model.id)
    })

    const errorMessage = computed(() => store.getSingleMessage(dataKey))

    const handleChange = (value: unknown) => {
      store.updateSingleValue(dataKey, value)
      if (errorMessage.value) {
        store.singleValidate(dataKey)
      }
      onChange({ [dataKey]: value }, props.model)
      store.viewLinkage.execute(dataKey, value)
      store.events.emit('field.change', value)
      store.events.emit(`field.${dataKey}.change`, value)
    }

    const handleBlur = (value: unknown) => {
      store.events.emit(`field.${dataKey}.blur`, value)
    }

    const handleFocus = (value: unknown) => {
      store.events.emit(`field.${dataKey}.focus`, value)
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
