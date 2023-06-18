import { FunctionalComponent } from 'vue'
import BrightnessOutlinedSvg from '../svg/outlined/brightness.svg'
import Icon, { IconProps } from '../components'

export type BrightnessOutlinedProps = FunctionalComponent<IconProps>

const BrightnessOutlined: BrightnessOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BrightnessOutlinedSvg />
    </Icon>
  )
}

export default BrightnessOutlined
