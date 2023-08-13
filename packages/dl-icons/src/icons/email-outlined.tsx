import { FunctionalComponent } from 'vue'
import EmailOutlinedSvg from '../svg/outlined/email.svg'
import Icon, { IconProps } from '../components'

export type EmailOutlinedProps = FunctionalComponent<IconProps>

const EmailOutlined: EmailOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <EmailOutlinedSvg />
    </Icon>
  )
}

export default EmailOutlined
