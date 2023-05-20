import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import CheckOutlinedSvg from '../svg/outlined/check.svg'

export type CheckOutlinedProps = FunctionalComponent<IconProps>

const CheckOutlined: CheckOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CheckOutlinedSvg />
    </Icon>
  )
}

export default CheckOutlined
