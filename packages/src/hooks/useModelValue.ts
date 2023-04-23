import { computed, ref, SetupContext, watchEffect, WritableComputedRef } from 'vue'
import { EmitsOptions } from '@vue/runtime-core'

type Props<P, V> = P & { modelValue?: V } & { value?: V }

type UseDefaultReturnType<V> = [WritableComputedRef<V>, (value: V) => void]

function useModelValue<V, P, E = EmitsOptions>(
  props: Props<P, V>,
  emit: SetupContext<E>['emit']
): UseDefaultReturnType<V>

function useModelValue<V, P, VK extends string, E = EmitsOptions>(
  props: Props<P, V> & Record<VK, V>,
  emit: SetupContext<E>['emit'],
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
function useModelValue<V, P, VK extends string>(
  props: P & { modelValue?: V } & { value?: V } & Record<VK, V>,
  emit: SetupContext['emit'],
  valueKey?: VK,
  eventName?: `update:${VK}`
) {
  const innerValue = ref<V>()

  const isUsedModelValue = props.modelValue !== undefined
  const isUsedValue = props.value !== undefined
  const isUsedCustomValue = valueKey && props[valueKey] !== undefined

  watchEffect(() => {
    if (isUsedCustomValue) {
      innerValue.value = props[valueKey]
    } else {
      if (isUsedValue) {
        innerValue.value = props.value
      } else if (isUsedModelValue) {
        innerValue.value = props.modelValue
      }
    }
  })

  function setInnerValue(value: V) {
    innerValue.value = value
  }

  function updateValue(value: V) {
    if (isUsedCustomValue) {
      emit(eventName!, value)
    } else {
      if (isUsedValue) {
        emit('update:value', value)
      } else if (isUsedModelValue) {
        emit('update:model-value', value)
      }
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

  return [innerValueRef, updateValue]
}

export default useModelValue
