<template>
  <form :class="formClassName" @submit.prevent>
    <button type="submit" class="d-hide" />
    <form-render :data="store!.getFormModels()" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, provide, watch } from 'vue'
import { FORM_PROPS } from './props'
import { formNamespace, createFormBEM } from './constants'
import { OnFormChange } from './types'
import { FORM_CONTEXT_KEY } from './context'
import { FormStore } from './store'
import FormRender from './components/form-render.vue'
import { useConfig } from '../hooks'
import { DEFAULT_REQUIRED_MARK_POSITION } from '../constants'

export default defineComponent({
  name: formNamespace,
  components: {
    FormRender
  },
  props: FORM_PROPS,
  emits: ['change'],
  setup(props, { emit }) {
    const store = props.store || new FormStore()
    const config = useConfig(
      ['colon', 'requiredMarkPosition', 'layout', 'labelWidth', 'clientType'],
      props as any
    )
    const formClassName = computed(() =>
      createFormBEM({
        'has-bg': props.hasBackground,
        [config.value.clientType!.toLowerCase()]: true,
        border: props.border ?? props.clientType === 'MOBILE'
      })
    )

    const formProps = computed(() => {
      return {
        colon: config.value.colon,
        hideLabel: props.hideLabel,
        layout: config.value.layout,
        labelWidth: config.value.labelWidth,
        clientType: config.value.clientType,
        border: props.border ?? props.clientType === 'MOBILE',
        requiredMarkPosition: config.value.requiredMarkPosition || DEFAULT_REQUIRED_MARK_POSITION
      }
    })

    const handleChange: OnFormChange = (value, model) => {
      emit('change', value, model)
    }

    provide(FORM_CONTEXT_KEY, {
      store,
      formProps,
      onChange: handleChange
    })

    watch(() => props.disabled, store.setFormDisabled)
    watch(() => props.readonly, store.setFormReadonly)
    watch(
      () => props.models,
      () => {
        store.init({
          models: props.models,
          viewLinkage: props.viewLinkage
        })
      },
      {
        immediate: true
      }
    )
    watch(() => props.viewLinkage, store.viewLinkage.init)

    return {
      formClassName,
      store,
      formProps
    }
  }
})
</script>
