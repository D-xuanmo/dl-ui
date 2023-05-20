import { FunctionalComponent } from 'vue'
import CheckSquareFilledSvg from '../svg/filled/check-square.svg'
import Icon, { IconProps } from '../components'

export type CheckSquareFilledProps = FunctionalComponent<IconProps>

const CheckSquareFilled: CheckSquareFilledProps = (props) => {
  return (
    <Icon {...props}>
      <CheckSquareFilledSvg />
    </Icon>
  )
}

export default CheckSquareFilled
