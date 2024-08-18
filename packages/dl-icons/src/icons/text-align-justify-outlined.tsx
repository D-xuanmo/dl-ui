import { FunctionalComponent } from 'vue'
import TextAlignJustifyOutlinedSvg from '../svg/outlined/text-align-justify.svg'
import Icon, { IconProps } from '../components'

export type TextAlignJustifyOutlinedProps = FunctionalComponent<IconProps>

const TextAlignJustifyOutlined: TextAlignJustifyOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextAlignJustifyOutlinedSvg />
    </Icon>
  )
}

export default TextAlignJustifyOutlined
