import { FunctionalComponent } from 'vue'
import PersonShareOutlinedSvg from '../svg/outlined/person-share.svg'
import Icon, { IconProps } from '../components'

export type PersonShareOutlinedProps = FunctionalComponent<IconProps>

const PersonShareOutlined: PersonShareOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PersonShareOutlinedSvg />
    </Icon>
  )
}

export default PersonShareOutlined
