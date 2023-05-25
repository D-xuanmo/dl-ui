import { FunctionalComponent } from 'vue'
import EyeOutlinedSvg from '../svg/outlined/eye.svg'
import Icon, { IconProps } from '../components'

export type EyeOutlinedProps = FunctionalComponent<IconProps>

const EyeOutlined: EyeOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <EyeOutlinedSvg />
    </Icon>
  )
}

export default EyeOutlined
