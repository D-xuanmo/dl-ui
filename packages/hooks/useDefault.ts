import { computed, ref, SetupContext, watchEffect, WritableComputedRef } from 'vue'

function useDefault<V, T>(props: T & { modelValue?: V }, emit: SetupContext['emit']) {
  const innerValue = ref<V>()

  watchEffect(() => {
    if (props.modelValue !== undefined) {
      innerValue.value = props.modelValue
    }
  })

  function setInnerValue(value: V) {
    emit('update:modelValue', value)
  }

  const innerValueRef = computed<V>({
    get() {
      return innerValue.value as V
    },
    set(value: V) {
      setInnerValue(value)
    }
  })

  return [innerValueRef, setInnerValue] as [WritableComputedRef<V>, typeof setInnerValue]
}

export default useDefault
