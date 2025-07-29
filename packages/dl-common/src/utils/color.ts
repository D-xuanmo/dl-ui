import chroma from 'chroma-js'
import { ERROR_COLOR, PREFIX, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from '../constants'
import { ThemeType } from '../common'
import { ConfigProviderTheme } from '../config-provider'

export const generateColors = (color: string) => [
  ...Array.from({ length: 5 })
    .map((_, index) =>
      chroma
        .scale([color, '#fff'])((index + 5) / 10)
        .hex()
    )
    .toReversed(),
  ...Array.from({ length: 5 }).map((_, index) =>
    chroma
      .scale([color, '#000'])(index / 10)
      .hex()
  )
]

const setHTMLStyle = (colors: string[], key: ThemeType | 'error') => {
  document.querySelector('html')!.style.cssText += [
    `--${PREFIX}-${key}: ${colors[5]};`,
    ...colors.reduce<string[]>(
      (prev, current, index) => [...prev, `--${PREFIX}-${key}-${index + 1}: ${current};`],
      []
    )
  ].join('')
}

export const generatePrimaryColors = (primaryColor = PRIMARY_COLOR) => {
  setHTMLStyle(generateColors(primaryColor), 'primary')
}

export const generateSuccessColors = (color = SUCCESS_COLOR) => {
  setHTMLStyle(generateColors(color), 'success')
}

export const generateWarningColors = (color = WARNING_COLOR) => {
  setHTMLStyle(generateColors(color), 'warning')
}

export const generateErrorColors = (color = ERROR_COLOR) => {
  setHTMLStyle(generateColors(color), 'error')
}

export const initColors = (theme: ConfigProviderTheme) => {
  generatePrimaryColors(theme.primary)
  generateSuccessColors(theme.success)
  generateWarningColors(theme.warning)
  generateErrorColors(theme.error)
}
