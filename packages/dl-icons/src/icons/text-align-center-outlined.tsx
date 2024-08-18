import { FunctionalComponent } from 'vue'
import TextAlignCenterOutlinedSvg from '../svg/outlined/text-align-center.svg'
import Icon, { IconProps } from '../components'

export type TextAlignCenterOutlinedProps = FunctionalComponent<IconProps>

const TextAlignCenterOutlined: TextAlignCenterOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TextAlignCenterOutlinedSvg />
    </Icon>
  )
}

export default TextAlignCenterOutlined
