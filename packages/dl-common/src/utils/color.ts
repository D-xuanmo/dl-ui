import { generate } from '@ant-design/colors'
import { PREFIX } from '../constants'

export const generatePrimaryColors = () => {
  const colors = generate('#1890ff')
  document.querySelector('html')!.style.cssText = [
    `--${PREFIX}-primary: ${colors[5]};`,
    ...colors.reduce<string[]>(
      (prev, current, index) => [...prev, `--${PREFIX}-primary-${index + 1}: ${current};`],
      []
    )
  ].join('')
}

export * from '@ant-design/colors'
