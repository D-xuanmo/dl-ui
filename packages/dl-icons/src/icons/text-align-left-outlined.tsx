import { FunctionalComponent } from 'vue'
import TextAlignLeftOutlinedSvg from '../svg/outlined/text-align-left.svg'
import Icon, { IconProps } from '../components'

export type TextAlignLeftOutlinedProps = FunctionalComponent<IconProps>

const TextAlignLeftOutlined: TextAlignLeftOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextAlignLeftOutlinedSvg />
    </Icon>
  )
}

export default TextAlignLeftOutlined
