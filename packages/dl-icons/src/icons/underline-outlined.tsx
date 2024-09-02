import { FunctionalComponent } from 'vue'
import UnderlineOutlinedSvg from '../svg/outlined/underline.svg'
import Icon, { IconProps } from '../components'

export type UnderlineOutlinedProps = FunctionalComponent<IconProps>

const UnderlineOutlined: UnderlineOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <UnderlineOutlinedSvg />
    </Icon>
  )
}

export default UnderlineOutlined
