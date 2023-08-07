import { FunctionalComponent } from 'vue'
import DashboardOutlinedSvg from '../svg/outlined/dashboard.svg'
import Icon, { IconProps } from '../components'

export type DashboardOutlinedProps = FunctionalComponent<IconProps>

const DashboardOutlined: DashboardOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DashboardOutlinedSvg />
    </Icon>
  )
}

export default DashboardOutlined
