import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import CheckCircleOutlinedSvg from '../svg/outlined/check-circle.svg'

export type CheckCircleOutlinedProps = FunctionalComponent<IconProps>

const CheckCircleOutlined: CheckCircleOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CheckCircleOutlinedSvg />
    </Icon>
  )
}

export default CheckCircleOutlined
