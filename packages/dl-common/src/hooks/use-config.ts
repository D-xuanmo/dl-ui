import { ConfigProviderInjectKey, ConfigProviderProps } from '../config-provider'
import { inject } from 'vue'
import { isEmpty } from '@xuanmo/utils'
import { CustomKeys } from '../common'
import { LABEL_WIDTH } from '../constants'

/**
 * 获取 config provider 对应的参数
 * @param keys 需要获取的属性
 * @param currentProps 当前组件 props 或者需要合并的 props
 */
export function useConfig<
  T extends keyof ConfigProviderProps,
  P extends Pick<ConfigProviderProps, T>
>(keys: T[], currentProps: P) {
  const config = inject(ConfigProviderInjectKey, {
    requiredMarkPosition: 'right',
    labelWidth: LABEL_WIDTH,
    keys: <CustomKeys>{
      label: 'label',
      value: 'value',
      children: 'children'
    }
  } as ConfigProviderProps)

  return keys.reduce((prev, currentKey) => {
    return {
      ...prev,
      [currentKey]: isEmpty(currentProps[currentKey])
        ? config[currentKey]
        : currentProps[currentKey]
    }
  }, {}) as { [Key in T]: ConfigProviderProps[Key] }
}
