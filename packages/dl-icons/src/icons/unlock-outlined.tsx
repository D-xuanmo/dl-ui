import { FunctionalComponent } from 'vue'
import UnlockOutlinedSvg from '../svg/outlined/unlock.svg'
import Icon, { IconProps } from '../components'

export type UnlockOutlinedProps = FunctionalComponent<IconProps>

const UnlockOutlined: UnlockOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <UnlockOutlinedSvg />
    </Icon>
  )
}

export default UnlockOutlined
