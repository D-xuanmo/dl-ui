<template>
  <form :class="formClassName" @submit.prevent>
    <button type="submit" class="d-hide" />
    <form-render />
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
      [
        'colon',
        'requiredMarkPosition',
        'layout',
        'labelWidth',
        'clientType',
        'border',
        'round',
        'idGenerator'
      ],
      props as any
    )
    const formClassName = computed(() =>
      createFormBEM({
        'has-bg': props.hasBackground,
        [config.value.clientType!.toLowerCase()]: true,
        border: config.value.border ?? config.value.clientType === 'MOBILE'
      })
    )

    const formProps = computed(() => {
      return {
        colon: config.value.colon,
        round: config.value.round,
        hideLabel: props.hideLabel,
        layout: config.value.layout,
        contentAlign: props.contentAlign,
        labelWidth: config.value.labelWidth,
        clientType: config.value.clientType,
        border: config.value.border ?? config.value.clientType === 'MOBILE',
        requiredMarkPosition: config.value.requiredMarkPosition || DEFAULT_REQUIRED_MARK_POSITION
      }
    })

    store.idGenerator = config.value.idGenerator!

    const handleChange: OnFormChange = (value, model) => {
      emit('change', value, model)
    }

    provide(FORM_CONTEXT_KEY, {
      store,
      formProps,
      onChange: handleChange
    })

    watch(
      () => props.models,
      (models) => {
        store.init({
          models: models,
          viewLinkage: props.viewLinkage
        })
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.data,
      (data) => store.updateData(data!, false),
      {
        immediate: true
      }
    )
    watch(() => props.disabled, store.setFormDisabled)
    watch(() => props.readonly, store.setFormReadonly)
    watch(() => props.viewLinkage, store.viewLinkageStore.init)

    return {
      formClassName,
      store,
      formProps
    }
  }
})
</script>
