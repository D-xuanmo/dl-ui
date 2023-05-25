import { FunctionalComponent } from 'vue'
import EyeInvisibleOutlinedSvg from '../svg/outlined/eye-invisible.svg'
import Icon, { IconProps } from '../components'

export type EyeInvisibleOutlinedProps = FunctionalComponent<IconProps>

const EyeInvisibleOutlined: EyeInvisibleOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <EyeInvisibleOutlinedSvg />
    </Icon>
  )
}

export default EyeInvisibleOutlined
