import { FunctionalComponent } from 'vue'
import LockOutlinedSvg from '../svg/outlined/lock.svg'
import Icon, { IconProps } from '../components'

export type LockOutlinedProps = FunctionalComponent<IconProps>

const LockOutlined: LockOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LockOutlinedSvg />
    </Icon>
  )
}

export default LockOutlined
