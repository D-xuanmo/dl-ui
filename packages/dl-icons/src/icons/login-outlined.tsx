import { FunctionalComponent } from 'vue'
import LoginOutlinedSvg from '../svg/outlined/login.svg'
import Icon, { IconProps } from '../components'

export type LoginOutlinedProps = FunctionalComponent<IconProps>

const LoginOutlined: LoginOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LoginOutlinedSvg />
    </Icon>
  )
}

export default LoginOutlined
