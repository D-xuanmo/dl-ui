<template>
  <form :class="formClassName" @submit.prevent>
    <template v-if="store?.isGroupMode">
      <template v-for="[groupId, group] in store?.groups">
        <d-cell-group
          v-if="group.hide !== true"
          :key="groupId"
          :title="group.title"
          :layout="layout"
          :round="false"
        >
          <template v-for="itemName in group?.items">
            <d-form-item
              v-if="store?.models.get(itemName)?.hide !== true"
              :key="itemName"
              :model-item="store?.models.get(itemName)"
              :store="store"
              :disabled="disabled"
              :readonly="readonly"
              :label-width="labelWidth"
              :hide-label="hideLabel"
              :colon="colon"
              :required-mark-position="requiredMarkPosition"
              :error-message="store?.errorMessages?.[itemName]!"
              @change="handleChange"
            />
          </template>
        </d-cell-group>
      </template>
    </template>
    <template v-else>
      <template v-for="[name, item] in store?.models">
        <d-form-item
          v-if="item.hide !== true"
          :key="name"
          :model-item="item"
          :store="store"
          :disabled="disabled"
          :readonly="readonly"
          :label-width="labelWidth"
          :hide-label="hideLabel"
          :layout="layout"
          :colon="colon"
          :required-mark-position="requiredMarkPosition"
          :error-message="store?.errorMessages?.[name]"
          @change="handleChange"
        />
      </template>
    </template>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FORM_PROPS } from './props'
import DFormItem from './form-item.vue'
import { formNamespace, createFormBEM } from './constants'
import DCellGroup from '../cell-group'
import { OnFormChange } from './types'

export default defineComponent({
  name: formNamespace,
  components: {
    DFormItem,
    DCellGroup
  },
  props: FORM_PROPS,
  emits: ['change'],
  setup(props, { emit }) {
    const formClassName = createFormBEM()

    const handleChange: OnFormChange = (value, model) => {
      emit('change', value, model)
    }

    return {
      formClassName,
      handleChange
    }
  }
})
</script>
