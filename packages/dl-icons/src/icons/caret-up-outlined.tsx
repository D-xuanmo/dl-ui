import { FunctionalComponent } from 'vue'
import CaretUpOutlinedSvg from '../svg/outlined/caret-up.svg'
import Icon, { IconProps } from '../components'

export type CaretUpOutlinedProps = FunctionalComponent<IconProps>

const CaretUpOutlined: CaretUpOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CaretUpOutlinedSvg />
    </Icon>
  )
}

export default CaretUpOutlined
