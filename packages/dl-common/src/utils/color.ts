import { generate } from '@ant-design/colors'
import { ERROR_COLOR, PREFIX, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from '../constants'
import { ThemeEnum } from '../common'

const setHTMLStyle = (colors: string[], key: ThemeEnum | 'error') => {
  document.querySelector('html')!.style.cssText += [
    `--${PREFIX}-${key}: ${colors[5]};`,
    ...colors.reduce<string[]>(
      (prev, current, index) => [...prev, `--${PREFIX}-${key}-${index + 1}: ${current};`],
      []
    )
  ].join('')
}

export const generatePrimaryColors = (primaryColor = PRIMARY_COLOR) => {
  setHTMLStyle(generate(primaryColor), 'primary')
}

export const generateSuccessColors = (color = SUCCESS_COLOR) => {
  setHTMLStyle(generate(color), 'success')
}

export const generateWarningColors = (color = WARNING_COLOR) => {
  setHTMLStyle(generate(color), 'warning')
}

export const generateErrorColors = (color = ERROR_COLOR) => {
  setHTMLStyle(generate(color), 'error')
}

export * from '@ant-design/colors'
