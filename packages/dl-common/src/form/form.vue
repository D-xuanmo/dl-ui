<template>
  <form :class="formClassName" @submit.prevent>
    <button type="submit" class="d-hide" />
    <form-render :data="store.getFormModels()" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'
import { FORM_PROPS } from './props'
import { formNamespace, createFormBEM } from './constants'
import { OnFormChange } from './types'
import { FORM_CONTEXT_KEY } from './context'
import { FormStore } from './store'
import FormRender from './render.vue'

export default defineComponent({
  name: formNamespace,
  components: {
    FormRender
  },
  props: FORM_PROPS,
  emits: ['change'],
  setup(props, { emit }) {
    const store = props.store || new FormStore()
    const formClassName = computed(() =>
      createFormBEM({
        'has-bg': props.hasBackground,
        [props.clientType]: true
      })
    )

    const formProps = computed(() => ({
      colon: props.colon,
      disabled: props.disabled,
      readonly: props.readonly,
      layout: props.layout,
      labelWidth: props.labelWidth,
      hideLabel: props.hideLabel,
      requiredMarkPosition: props.requiredMarkPosition
    }))

    const handleChange: OnFormChange = (value, model) => {
      emit('change', value, model)
    }

    store.init({
      models: props.models
    })

    provide(FORM_CONTEXT_KEY, {
      store,
      formProps,
      onChange: handleChange
    })

    return {
      formClassName,
      store
    }
  }
})
</script>
