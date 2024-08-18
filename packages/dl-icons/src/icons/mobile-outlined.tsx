import { FunctionalComponent } from 'vue'
import MobileOutlinedSvg from '../svg/outlined/mobile.svg'
import Icon, { IconProps } from '../components'

export type MobileOutlinedProps = FunctionalComponent<IconProps>

const MobileOutlined: MobileOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <MobileOutlinedSvg />
    </Icon>
  )
}

export default MobileOutlined
