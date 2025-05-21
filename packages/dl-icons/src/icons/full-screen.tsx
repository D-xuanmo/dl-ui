import { FunctionalComponent } from 'vue'
import FullScreenOutlinedSvg from '../svg/outlined/full-screen.svg'
import Icon, { IconProps } from '../components'

export type FullScreenOutlinedProps = FunctionalComponent<IconProps>

export const FullScreenOutlined: FullScreenOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FullScreenOutlinedSvg />
    </Icon>
  )
}
