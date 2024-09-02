import { FunctionalComponent } from 'vue'
import TextOutlinedSvg from '../svg/outlined/text.svg'
import Icon, { IconProps } from '../components'

export type TextOutlinedProps = FunctionalComponent<IconProps>

const TextOutlined: TextOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextOutlinedSvg />
    </Icon>
  )
}

export default TextOutlined
