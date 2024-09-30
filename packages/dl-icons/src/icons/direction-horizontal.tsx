import { FunctionalComponent } from 'vue'
import DirectionHorizontalOutlinedSvg from '../svg/outlined/direction-horizontal.svg'
import Icon, { IconProps } from '../components'

export type DirectionHorizontalOutlinedProps = FunctionalComponent<IconProps>

export const DirectionHorizontalOutlined: DirectionHorizontalOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DirectionHorizontalOutlinedSvg />
    </Icon>
  )
}
