import { FunctionalComponent } from 'vue'
import NumberInputOutlinedSvg from '../svg/outlined/number-input.svg'
import Icon, { IconProps } from '../components'

export type NumberInputOutlinedProps = FunctionalComponent<IconProps>

export const NumberInputOutlined: NumberInputOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <NumberInputOutlinedSvg />
    </Icon>
  )
}
