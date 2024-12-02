import { ConfigProviderInjectKey, ConfigProviderProps } from '../config-provider'
import { computed, inject } from 'vue'
import { createRandomID, isEmpty } from '@xuanmo/utils'
import { CustomKeys } from '../common'
import { DEFAULT_REQUIRED_MARK_POSITION, SEPARATOR } from '../constants'

const globalConfig = {
  keys: {
    label: 'label',
    value: 'value',
    children: 'children'
  },
  requiredMarkPosition: DEFAULT_REQUIRED_MARK_POSITION,
  clientType: 'MOBILE',
  layout: 'horizontal',
  round: true,
  separator: SEPARATOR,
  closeOnEsc: true,
  direction: 'horizontal',
  idGenerator: createRandomID
} as ConfigProviderProps

/**
 * 获取 config provider 对应的参数
 * @param keys 需要获取的属性
 * @param currentProps 当前组件 props 或者需要合并的 props
 */
export function useConfig<
  T extends keyof ConfigProviderProps,
  P extends Pick<ConfigProviderProps, T>
>(keys: T[], currentProps?: P) {
  const config = inject(
    ConfigProviderInjectKey,
    computed(() => globalConfig)
  )

  return computed(
    () =>
      keys.reduce((prev, currentKey) => {
        if (currentKey === 'keys') {
          return {
            ...prev,
            keys: {
              ...globalConfig.keys,
              ...config.value.keys,
              ...(currentProps as ConfigProviderProps).keys
            }
          }
        }
        return {
          ...prev,
          [currentKey]: isEmpty(currentProps?.[currentKey])
            ? config.value[currentKey] ?? globalConfig[currentKey]
            : currentProps?.[currentKey]
        }
      }, {}) as { [Key in T]: Key extends 'keys' ? Required<CustomKeys> : ConfigProviderProps[Key] }
  )
}
