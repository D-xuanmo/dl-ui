import { FunctionalComponent } from 'vue'
import OptionOutlinedSvg from '../svg/outlined/option-outlined.svg'
import Icon, { IconProps } from '../components'

export type OptionOutlinedProps = FunctionalComponent<IconProps>

export const OptionOutlined: OptionOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <OptionOutlinedSvg />
    </Icon>
  )
}
