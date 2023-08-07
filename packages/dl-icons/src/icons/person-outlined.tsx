import { FunctionalComponent } from 'vue'
import PersonOutlinedSvg from '../svg/outlined/person.svg'
import Icon, { IconProps } from '../components'

export type PersonOutlinedProps = FunctionalComponent<IconProps>

const PersonOutlined: PersonOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PersonOutlinedSvg />
    </Icon>
  )
}

export default PersonOutlined
