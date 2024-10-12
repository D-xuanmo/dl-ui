import { FunctionalComponent } from 'vue'
import OptionFilledSvg from '../svg/outlined/option.svg'
import Icon, { IconProps } from '../components'

export type OptionFilledProps = FunctionalComponent<IconProps>

export const OptionFilled: OptionFilledProps = (props) => {
  return (
    <Icon {...props}>
      <OptionFilledSvg />
    </Icon>
  )
}
