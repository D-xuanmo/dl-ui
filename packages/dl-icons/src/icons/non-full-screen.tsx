import { FunctionalComponent } from 'vue'
import NonFullScreenOutlinedSvg from '../svg/outlined/non-full-screen.svg'
import Icon, { IconProps } from '../components'

export type NonFullScreenOutlinedProps = FunctionalComponent<IconProps>

export const NonFullScreenOutlined: NonFullScreenOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <NonFullScreenOutlinedSvg />
    </Icon>
  )
}
