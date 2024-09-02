import { FunctionalComponent } from 'vue'
import TextItalicOutlinedSvg from '../svg/outlined/text-italic.svg'
import Icon, { IconProps } from '../components'

export type TextItalicOutlinedProps = FunctionalComponent<IconProps>

const TextItalicOutlined: TextItalicOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextItalicOutlinedSvg />
    </Icon>
  )
}

export default TextItalicOutlined
