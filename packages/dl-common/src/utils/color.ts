import { generate } from '@ant-design/colors'
import { ERROR_COLOR, PREFIX, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from '../constants'

export const generatePrimaryColors = (primaryColor = PRIMARY_COLOR) => {
  const colors = generate(primaryColor)
  document.querySelector('html')!.style.cssText += [
    `--${PREFIX}-primary: ${colors[5]};`,
    ...colors.reduce<string[]>(
      (prev, current, index) => [...prev, `--${PREFIX}-primary-${index + 1}: ${current};`],
      []
    )
  ].join('')
}

export const generateSuccessColors = (color = SUCCESS_COLOR) => {
  const colors = generate(color)
  document.querySelector('html')!.style.setProperty(`--${PREFIX}-success`, color)
  document.querySelector('html')!.style.setProperty(`--${PREFIX}-success-bg`, colors[0])
}

export const generateWarningColors = (color = WARNING_COLOR) => {
  const colors = generate(color)
  document.querySelector('html')!.style.setProperty(`--${PREFIX}-warning`, color)
  document.querySelector('html')!.style.setProperty(`--${PREFIX}-warning-bg`, colors[0])
}

export const generateErrorColors = (color = ERROR_COLOR) => {
  const colors = generate(color)
  document.querySelector('html')!.style.setProperty(`--${PREFIX}-error`, color)
  document.querySelector('html')!.style.setProperty(`--${PREFIX}-error-bg`, colors[0])
}

export * from '@ant-design/colors'
