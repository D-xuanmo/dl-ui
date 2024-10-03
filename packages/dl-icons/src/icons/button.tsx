import { FunctionalComponent } from 'vue'
import ButtonOutlinedSvg from '../svg/outlined/button.svg'
import Icon, { IconProps } from '../components'

export type ButtonOutlinedProps = FunctionalComponent<IconProps>

export const ButtonOutlined: ButtonOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ButtonOutlinedSvg />
    </Icon>
  )
}
