import { FunctionalComponent } from 'vue'
import CheckCircleFilledSvg from '../svg/filled/check-circle.svg'
import Icon, { IconProps } from '../components'

export type CheckCircleFilledProps = FunctionalComponent<IconProps>

const CheckCircleFilled: CheckCircleFilledProps = (props) => {
  return (
    <Icon {...props}>
      <CheckCircleFilledSvg />
    </Icon>
  )
}

export default CheckCircleFilled
