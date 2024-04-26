import { ConfigProviderInjectKey, ConfigProviderProps } from '../config-provider'
import { computed, inject } from 'vue'
import { isEmpty } from '@xuanmo/utils'
import { CustomKeys } from '../common'
import { DEFAULT_REQUIRED_MARK_POSITION, LABEL_WIDTH } from '../constants'

const globalConfig = {
  keys: {
    label: 'label',
    value: 'value',
    children: 'children'
  },
  labelWidth: LABEL_WIDTH,
  requiredMarkPosition: DEFAULT_REQUIRED_MARK_POSITION,
  clientType: 'MOBILE'
} as ConfigProviderProps

/**
 * 获取 config provider 对应的参数
 * @param keys 需要获取的属性
 * @param currentProps 当前组件 props 或者需要合并的 props
 */
export function useConfig<
  T extends keyof ConfigProviderProps,
  P extends Pick<ConfigProviderProps, T>
>(keys: T[], currentProps: P) {
  const config = inject(ConfigProviderInjectKey, globalConfig as ConfigProviderProps)

  return computed(
    () =>
      keys.reduce((prev, currentKey) => {
        if (currentKey === 'keys') {
          return {
            ...prev,
            keys: {
              ...globalConfig.keys,
              ...config.keys,
              ...(currentProps as ConfigProviderProps).keys
            }
          }
        }
        return {
          ...prev,
          [currentKey]: isEmpty(currentProps[currentKey])
            ? config[currentKey]
            : currentProps[currentKey]
        }
      }, {}) as { [Key in T]: Key extends 'keys' ? Required<CustomKeys> : ConfigProviderProps[Key] }
  )
}
