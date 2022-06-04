import { computed, ref, SetupContext, watchEffect, WritableComputedRef } from 'vue'

function useDefault<V, P, VK extends string>(
  props: P & { modelValue?: V } & { value?: V } & Record<VK, V>,
  emit: SetupContext['emit'],
  valueKey?: VK,
  eventName?: string
) {
  const innerValue = ref<V>()

  const isUsedModelValue = props.modelValue !== undefined
  const isUsedValue = props.value !== undefined
  const isUsedCustomValue = valueKey && props[valueKey] !== undefined

  watchEffect(() => {
    if (isUsedModelValue) {
      innerValue.value = props.modelValue
    }
    if (isUsedCustomValue) {
      innerValue.value = props[valueKey]
    }
    if (isUsedValue) {
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
    if (eventName) {
      emit(eventName, value)
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
