import { ConfigProviderProps } from './props'
import { computed, CSSProperties } from 'vue'
import { PREFIX } from '../constants'
import { ThemeType } from '../common'
import { color } from '../utils'

const generateStyle = (colors: string[], key: ThemeType | 'error') => {
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

export const useTheme = (props: ConfigProviderProps) => {
  return computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (props.theme?.primary) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.primary), 'primary'))
    }
    if (props.theme?.success) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.success), 'success'))
    }
    if (props.theme?.warning) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.warning), 'warning'))
    }
    if (props.theme?.error) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.error), 'error'))
    }
    return style
  })
}

export function useStyle(props: ConfigProviderProps) {
  return computed<CSSProperties>(() => {
    const style: CSSProperties = {
      height: props.fullHeight ? '100%' : undefined
    }
    if (props.theme?.primary) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.primary), 'primary'))
    }
    if (props.theme?.success) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.success), 'success'))
    }
    if (props.theme?.warning) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.warning), 'warning'))
    }
    if (props.theme?.error) {
      Object.assign(style, generateStyle(color.generateColors(props.theme.error), 'error'))
    }
    return style
  })
}
