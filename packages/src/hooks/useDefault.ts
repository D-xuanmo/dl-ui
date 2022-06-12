import { computed, ref, SetupContext, watchEffect, WritableComputedRef } from 'vue'

type Props<P, V> = P & { modelValue?: V } & { value?: V }

type UseDefaultReturnType<V> = [WritableComputedRef<V>, (value: V) => void]

function useDefault<V, P>(props: Props<P, V>, emit: SetupContext['emit']): UseDefaultReturnType<V>

function useDefault<V, P, VK extends string>(
  props: Props<P, V> & Record<VK, V>,
  emit: SetupContext['emit'],
  valueKey: VK,
  eventName: `update:${VK}`
): UseDefaultReturnType<V>

/**
 * 处理默认值及响应式变量
 * @param props
 * @param emit
 * @param valueKey 需要监听的字段
 * @param eventName 事件名
 */
function useDefault<V, P, VK extends string>(
  props: P & { modelValue?: V } & { value?: V } & Record<VK, V>,
  emit: SetupContext['emit'],
  valueKey?: VK,
  eventName?: VK extends string ? `update:${VK}` : never
) {
  const innerValue = ref<V>()

  const isUsedModelValue = props.modelValue !== undefined
  const isUsedValue = props.value !== undefined
  const isUsedCustomValue = valueKey && props[valueKey] !== undefined

  watchEffect(() => {
    if (isUsedValue) {
      innerValue.value = props.value
    } else if (isUsedModelValue) {
      innerValue.value = props.modelValue
    } else if (isUsedCustomValue) {
      innerValue.value = props[valueKey]
    }
  })

  function setInnerValue(value: V) {
    innerValue.value = value
  }

  function updateValue(value: V) {
    if (isUsedValue) {
      emit('update:value', value)
    } else if (isUsedModelValue) {
      emit('update:modelValue', value)
    } else if (eventName) {
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
