import { FunctionalComponent } from 'vue'
import DragOutlinedSvg from '../svg/outlined/drag.svg'
import Icon, { IconProps } from '../components'

export type DragOutlinedProps = FunctionalComponent<IconProps>

export const DragOutlined: DragOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DragOutlinedSvg />
    </Icon>
  )
}
