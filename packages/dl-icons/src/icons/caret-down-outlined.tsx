import { FunctionalComponent } from 'vue'
import CaretDownOutlinedSvg from '../svg/outlined/caret-down.svg'
import Icon, { IconProps } from '../components'

export type CaretDownOutlinedProps = FunctionalComponent<IconProps>

const CaretDownOutlined: CaretDownOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CaretDownOutlinedSvg />
    </Icon>
  )
}

export default CaretDownOutlined
