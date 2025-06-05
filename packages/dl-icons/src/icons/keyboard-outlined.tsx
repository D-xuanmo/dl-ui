import { FunctionalComponent } from 'vue'
import KeyboardOutlinedSvg from '../svg/outlined/keyboard.svg'
import Icon, { IconProps } from '../components'

export type KeyboardOutlinedProps = FunctionalComponent<IconProps>

export const KeyboardOutlined: KeyboardOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <KeyboardOutlinedSvg />
    </Icon>
  )
}
