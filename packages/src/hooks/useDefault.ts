import { computed, ref, SetupContext, watchEffect, WritableComputedRef } from 'vue'

function useDefault<V, T>(props: T & { modelValue?: V; value?: V }, emit: SetupContext['emit']) {
  const innerValue = ref<V>()

  const isUsedModelValue = props.modelValue !== undefined

  watchEffect(() => {
    if (isUsedModelValue) {
      innerValue.value = props.modelValue
    }
    if (props.value !== undefined) {
      innerValue.value = props.value
    }
  })

  function setInnerValue(value: V) {
    innerValue.value = value
  }

  function updateValue(value: V) {
    if (isUsedModelValue) {
      emit('update:modelValue', value)
    }
    if (props.value !== undefined) {
      emit('update:value', value)
    }
  }

  const innerValueRef = computed<V>({
    get() {
      return innerValue.value as V
    },
    set(value: V) {
      setInnerValue(value)
    }
  })

  return [innerValueRef, updateValue] as [WritableComputedRef<V>, typeof setInnerValue]
}

export default useDefault
