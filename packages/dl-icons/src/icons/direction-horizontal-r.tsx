import { FunctionalComponent } from 'vue'
import DirectionHorizontalROutlinedSvg from '../svg/outlined/direction-horizontal-r.svg'
import Icon, { IconProps } from '../components'

export type DirectionHorizontalROutlinedProps = FunctionalComponent<IconProps>

export const DirectionHorizontalROutlined: DirectionHorizontalROutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DirectionHorizontalROutlinedSvg />
    </Icon>
  )
}
