import { FunctionalComponent } from 'vue'
import SettingCompleteOutlinedSvg from '../svg/outlined/setting-complete.svg'
import Icon, { IconProps } from '../components'

export type SettingCompleteOutlinedProps = FunctionalComponent<IconProps>

export const SettingCompleteOutlined: SettingCompleteOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <SettingCompleteOutlinedSvg />
    </Icon>
  )
}
