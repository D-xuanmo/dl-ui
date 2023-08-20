import { FunctionalComponent } from 'vue'
import LogoutOutlinedSvg from '../svg/outlined/logout.svg'
import Icon, { IconProps } from '../components'

export type LogoutOutlinedProps = FunctionalComponent<IconProps>

const LogoutOutlined: LogoutOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LogoutOutlinedSvg />
    </Icon>
  )
}

export default LogoutOutlined
