import { ConfigProviderProps } from './props'
import { computed, CSSProperties } from 'vue'
import { generate } from '@ant-design/colors'
import { PREFIX } from '../constants'
import { ThemeEnum } from '../common'

const generateStyle = (colors: string[], key: ThemeEnum | 'error') => {
  return {
    [`--${PREFIX}-${key}`]: colors[5],
    ...colors.reduce(
      (prev, current, index) => ({
        ...prev,
        [`--${PREFIX}-${key}-${index + 1}`]: current
      }),
      {}
    )
  }
}

export function useStyle(props: ConfigProviderProps) {
  return computed<CSSProperties>(() => {
    const style: CSSProperties = {
      height: '100%'
    }
    if (props.theme?.primary) {
      Object.assign(style, generateStyle(generate(props.theme.primary), 'primary'))
    }
    if (props.theme?.success) {
      Object.assign(style, generateStyle(generate(props.theme.success), 'success'))
    }
    if (props.theme?.warning) {
      Object.assign(style, generateStyle(generate(props.theme.warning), 'warning'))
    }
    if (props.theme?.error) {
      Object.assign(style, generateStyle(generate(props.theme.error), 'error'))
    }
    return style
  })
}
