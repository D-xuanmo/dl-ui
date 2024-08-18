import { FunctionalComponent } from 'vue'
import DesktopOutlinedSvg from '../svg/outlined/desktop.svg'
import Icon, { IconProps } from '../components'

export type DesktopOutlinedProps = FunctionalComponent<IconProps>

const DesktopOutlined: DesktopOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DesktopOutlinedSvg />
    </Icon>
  )
}

export default DesktopOutlined
