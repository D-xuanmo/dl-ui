import { FunctionalComponent } from 'vue'
import TextareaOutlinedSvg from '../svg/outlined/textarea.svg'
import Icon, { IconProps } from '../components'

export type TextareaOutlinedProps = FunctionalComponent<IconProps>

export const TextareaOutlined: TextareaOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextareaOutlinedSvg />
    </Icon>
  )
}
