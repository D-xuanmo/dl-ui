import { FunctionalComponent } from 'vue'
import CaretRightOutlinedSvg from '../svg/outlined/caret-right.svg'
import Icon, { IconProps } from '../components'

export type CaretRightOutlinedProps = FunctionalComponent<IconProps>

const CaretRightOutlined: CaretRightOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CaretRightOutlinedSvg />
    </Icon>
  )
}

export default CaretRightOutlined
