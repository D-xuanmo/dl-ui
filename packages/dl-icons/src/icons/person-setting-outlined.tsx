import { FunctionalComponent } from 'vue'
import PersonSettingOutlinedSvg from '../svg/outlined/person-setting.svg'
import Icon, { IconProps } from '../components'

export type PersonSettingOutlinedProps = FunctionalComponent<IconProps>

const PersonSettingOutlined: PersonSettingOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PersonSettingOutlinedSvg />
    </Icon>
  )
}

export default PersonSettingOutlined
