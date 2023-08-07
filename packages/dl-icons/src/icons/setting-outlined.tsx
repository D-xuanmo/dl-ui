import { FunctionalComponent } from 'vue'
import SettingOutlinedSvg from '../svg/outlined/setting.svg'
import Icon, { IconProps } from '../components'

export type SettingOutlinedProps = FunctionalComponent<IconProps>

const SettingOutlined: SettingOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <SettingOutlinedSvg />
    </Icon>
  )
}

export default SettingOutlined
