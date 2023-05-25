import { FunctionalComponent } from 'vue'
import CaretLeftOutlinedSvg from '../svg/outlined/caret-left.svg'
import Icon, { IconProps } from '../components'

export type CaretLeftOutlinedProps = FunctionalComponent<IconProps>

const CaretLeftOutlined: CaretLeftOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CaretLeftOutlinedSvg />
    </Icon>
  )
}

export default CaretLeftOutlined
