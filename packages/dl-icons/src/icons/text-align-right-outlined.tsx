import { FunctionalComponent } from 'vue'
import TextAlignRightOutlinedSvg from '../svg/outlined/text-align-right.svg'
import Icon, { IconProps } from '../components'

export type TextAlignRightOutlinedProps = FunctionalComponent<IconProps>

const TextAlignRightOutlined: TextAlignRightOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextAlignRightOutlinedSvg />
    </Icon>
  )
}

export default TextAlignRightOutlined
