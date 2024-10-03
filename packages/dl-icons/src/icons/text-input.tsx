import { FunctionalComponent } from 'vue'
import TextInputOutlinedSvg from '../svg/outlined/text-input.svg'
import Icon, { IconProps } from '../components'

export type TextInputOutlinedProps = FunctionalComponent<IconProps>

export const TextInputOutlined: TextInputOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextInputOutlinedSvg />
    </Icon>
  )
}
