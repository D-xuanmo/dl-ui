import { computed, ref, watchEffect, WritableComputedRef } from 'vue'

function useDefault<V, T>(props: T & { modelValue?: V }) {
  const innerValue = ref<V>()

  watchEffect(() => {
    if (props.modelValue !== undefined) {
      innerValue.value = props.modelValue
    }
  })

  function setInnerValue(value: V) {
    innerValue.value = value
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
